import { computed, effect, signal } from '@preact/signals';
import type { ParsedPackage } from '../core/datapackage';
import {
  WipeEngine, type EngineMode, type EngineOptions, type EngineStats, type EngineStatus, type Job, type LogLevel,
} from '../core/engine';
import { defaultFilter, type HasKind, type PinnedMode } from '../core/filters';
import type { DiscordChannel, DiscordGuild, DiscordUser, MessageRecord } from '../core/types';
import { currentLang, detectLang, type Params } from '../i18n';
import type { DiscordLocation } from '../platform/discordDom';
import { load, save } from '../platform/storage';
import type { TokenSource } from '../platform/token';

// ---- settings ----------------------------------------------------------------

export type SpeedPreset = 'safe' | 'balanced' | 'fast' | 'custom';

export const SPEED_PRESETS: Record<Exclude<SpeedPreset, 'custom'>, { searchDelay: number; deleteDelay: number }> = {
  safe: { searchDelay: 3000, deleteDelay: 1600 },
  balanced: { searchDelay: 1500, deleteDelay: 1000 },
  fast: { searchDelay: 900, deleteDelay: 450 },
};

export interface Settings {
  lang: 'auto' | 'fr' | 'en';
  theme: 'auto' | 'dark' | 'light';
  fab: 'auto' | 'always' | 'never';
  speed: SpeedPreset;
  searchDelay: number;
  deleteDelay: number;
  adaptive: boolean;
  maxAttempts: number;
  emptyPageRetries: number;
  mode: EngineMode;
  confirm: boolean;
  privacy: boolean;
  archive: boolean;
  notify: boolean;
  sound: boolean;
}

export const defaultSettings: Settings = {
  lang: 'auto',
  theme: 'auto',
  fab: 'auto',
  speed: 'balanced',
  searchDelay: SPEED_PRESETS.balanced.searchDelay,
  deleteDelay: SPEED_PRESETS.balanced.deleteDelay,
  adaptive: true,
  maxAttempts: 3,
  emptyPageRetries: 3,
  mode: 'search',
  confirm: true,
  privacy: false,
  archive: true,
  notify: true,
  sound: true,
};

export interface UiFilter {
  authorMode: 'me' | 'custom';
  authorCustom: string;
  content: string;
  pattern: string;
  has: HasKind[];
  exclude: HasKind[];
  pinned: PinnedMode;
  includeNsfw: boolean;
  afterId: string;
  beforeId: string;
  afterDate: string;
  beforeDate: string;
  /** "Older than N days": relative, recomputed at each run (wins over beforeDate). */
  olderThanDays: number | null;
}

export function defaultUiFilter(): UiFilter {
  const { authorIds: _ignored, ...rest } = defaultFilter();
  return { authorMode: 'me', authorCustom: '', ...rest, olderThanDays: null };
}

export const settings = signal<Settings>(defaultSettings);
export const filter = signal<UiFilter>(defaultUiFilter());

export const updateSettings = (patch: Partial<Settings>) => (settings.value = { ...settings.value, ...patch });
export const updateFilter = (patch: Partial<UiFilter>) => (filter.value = { ...filter.value, ...patch });

export function activeFilterCount(f: UiFilter): number {
  return [
    f.authorMode === 'custom', !!f.content.trim(), !!f.pattern.trim(), f.has.length > 0, f.exclude.length > 0,
    f.pinned !== 'exclude', !f.includeNsfw, !!(f.afterDate || f.beforeDate || f.olderThanDays), !!(f.afterId || f.beforeId),
  ].filter(Boolean).length;
}

// ---- window / navigation -----------------------------------------------------------

export type Tab = 'wipe' | 'package' | 'archive' | 'logs' | 'settings';
export type WipeView = 'form' | 'run' | 'results';
export interface Rect { x: number; y: number; w: number; h: number }

export const MIN_W = 460;
export const MIN_H = 380;

export function defaultRect(): Rect {
  const w = Math.min(860, window.innerWidth - 32);
  const h = Math.min(640, window.innerHeight - 48);
  return { x: Math.max(16, window.innerWidth - w - 24), y: 56, w, h };
}

export function clampRect(r: Rect): Rect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = Math.max(Math.min(MIN_W, vw - 16), Math.min(r.w, vw - 16));
  const h = Math.max(Math.min(MIN_H, vh - 16), Math.min(r.h, vh - 16));
  return {
    w,
    h,
    x: Math.min(Math.max(8, r.x), Math.max(8, vw - w - 8)),
    y: Math.min(Math.max(8, r.y), Math.max(8, vh - h - 8)),
  };
}

export const ui = {
  open: signal(false),
  tab: signal<Tab>('wipe'),
  rect: signal<Rect>({ x: 0, y: 0, w: 860, h: 640 }),
  wipeView: signal<WipeView>('form'),
  filtersOpen: signal(true),
  discordLight: signal(false),
  toolbarMounted: signal(false),
};

export const isLight = computed(() => {
  const theme = settings.value.theme;
  return theme === 'auto' ? ui.discordLight.value : theme === 'light';
});

// ---- targets -------------------------------------------------------------------------

export type TargetMode = 'channel' | 'guild' | 'dms' | 'guilds' | 'custom';

export const target = {
  mode: signal<TargetMode>('channel'),
  dms: signal<string[]>([]),
  guilds: signal<string[]>([]),
  custom: signal(''),
  /** Channels to spare when wiping a whole server, remembered per server id. */
  excluded: signal<Record<string, string[]>>({}),
};

// ---- presets ---------------------------------------------------------------------------

export interface Preset {
  id: string;
  name: string;
  filter: UiFilter;
  targetMode: TargetMode;
  dms: string[];
  guilds: string[];
  custom: string;
  mode: EngineMode;
}

export const presets = signal<Preset[]>([]);

// ---- discord data -------------------------------------------------------------------------

export type TokenState = 'detecting' | 'ok' | 'missing' | 'invalid';

export interface ChannelInfo {
  kind: 'dm' | 'group' | 'guild';
  name: string;
  iconUrl: string | null;
}

export const discord = {
  token: signal<{ token: string; source: TokenSource } | null>(null),
  tokenState: signal<TokenState>('detecting'),
  manualToken: signal(''),
  me: signal<DiscordUser | null>(null),
  location: signal<DiscordLocation>({ guildId: null, channelId: null }),
  channelInfo: signal<ChannelInfo | null>(null),
  guilds: signal<DiscordGuild[] | null>(null),
  guildsLoading: signal(false),
  guildChannels: signal<Record<string, DiscordChannel[] | 'loading' | 'error'>>({}),
  dms: signal<DiscordChannel[] | null>(null),
  dmsLoading: signal(false),
  counts: signal<Record<string, number | 'loading' | 'error'>>({}),
  counting: signal<{ done: number; total: number } | null>(null),
};

export const currentGuild = computed(() => {
  const id = discord.location.value.guildId;
  if (!id || id === '@me') return null;
  return discord.guilds.value?.find(g => g.id === id) ?? { id, name: id, icon: null };
});

// ---- runs ---------------------------------------------------------------------------------

/** Append-only list with a version signal: cheap even with 100k entries. */
export class ListStore<T> {
  items: T[] = [];
  readonly version = signal(0);
  private timer = 0;

  constructor(private cap = Infinity) {}

  push(item: T) {
    this.items.push(item);
    if (this.items.length > this.cap) this.items.splice(0, this.items.length - this.cap);
    if (!this.timer) {
      this.timer = window.setTimeout(() => {
        this.timer = 0;
        this.version.value++;
      }, 150);
    }
  }

  clear() {
    this.items = [];
    this.version.value++;
  }
}

export interface LogEntry {
  id: number;
  time: number;
  level: LogLevel;
  key: string;
  params?: Params;
  sensitive?: boolean;
}

export const run = {
  status: signal<EngineStatus>('idle'),
  kind: signal<'delete' | 'preview'>('delete'),
  stats: signal<EngineStats>(WipeEngine.emptyStats()),
  jobs: signal<Job[]>([]),
  recent: new ListStore<MessageRecord>(40),
};

export const logs = new ListStore<LogEntry>(3000);
export const archive = new ListStore<MessageRecord>();
export const preview = {
  results: new ListStore<MessageRecord>(),
  /** Ids the user unticked; everything else is selected. */
  excluded: signal<Set<string>>(new Set()),
};

export interface SessionSnapshot {
  savedAt: number;
  options: EngineOptions;
  jobs: Job[];
}
export const savedSession = signal<SessionSnapshot | null>(null);

// ---- data package -----------------------------------------------------------------------------

export const pkg = {
  data: signal<ParsedPackage | null>(null),
  selected: signal<Set<string>>(new Set()),
  loading: signal(false),
  error: signal<string | null>(null),
  kind: signal<'all' | 'dm' | 'group' | 'guild'>('all'),
  query: signal(''),
};

// ---- toasts & dialogs ----------------------------------------------------------------------------

export interface Toast {
  id: number;
  kind: 'info' | 'success' | 'warn' | 'error';
  text: string;
}
export const toasts = signal<Toast[]>([]);

export interface ConfirmDialog {
  targets: number;
  count: number | null;
  counting: boolean;
  resolve: (ok: boolean) => void;
}
export const confirmDialog = signal<ConfirmDialog | null>(null);

// ---- persistence ------------------------------------------------------------------------------

export function initState() {
  settings.value = load('settings', defaultSettings);
  filter.value = load('filter', defaultUiFilter());
  ui.rect.value = clampRect(load('rect', defaultRect()));
  ui.tab.value = load<Tab>('tab', 'wipe');
  ui.filtersOpen.value = load('filtersOpen', true);
  target.mode.value = load<TargetMode>('targetMode', 'channel');
  target.custom.value = load('customTargets', '');
  target.excluded.value = load<Record<string, string[]>>('excludedChannels', {});
  presets.value = load<Preset[]>('presets', []);
  savedSession.value = load<SessionSnapshot | null>('session', null);

  effect(() => save('settings', settings.value));
  effect(() => save('filter', filter.value));
  effect(() => save('tab', ui.tab.value));
  effect(() => save('filtersOpen', ui.filtersOpen.value));
  effect(() => save('targetMode', target.mode.value));
  effect(() => save('customTargets', target.custom.value));
  effect(() => save('excludedChannels', target.excluded.value));
  effect(() => save('presets', presets.value));
  effect(() => {
    const lang = settings.value.lang;
    currentLang.value = lang === 'auto' ? detectLang() : lang;
  });
}

export const saveRect = () => save('rect', ui.rect.value);
