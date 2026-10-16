/** Glue between the UI state and the engine / Discord API. */

import { batch, effect } from '@preact/signals';
import { DiscordApi, DiscordApiError } from '../core/api';
import { archiveToCsv, archiveToHtml, archiveToJson, type ArchiveFormat } from '../core/archive';
import { parsePackageInput, type PackageChannel } from '../core/datapackage';
import {
  countMessages, createJob, WipeEngine, type EngineOptions, type Job, type JobTarget, type LogLevel,
} from '../core/engine';
import { compileRegex, createPackageMatcher, type MessageFilter } from '../core/filters';
import { isSnowflake, sortNewestFirst } from '../core/snowflake';
import type { DiscordChannel, MessageRecord } from '../core/types';
import { downloadFile, isAbortError, sleep, timestampForFile } from '../core/util';
import { t, type I18nKey, type Params } from '../i18n';
import { pickMessage, watchLocation, type DiscordLocation } from '../platform/discordDom';
import { desktopNotify, playChime } from '../platform/notify';
import { remove, save } from '../platform/storage';
import { looksLikeToken, nativeFetch, onTokenCaptured, resolveToken } from '../platform/token';
import { channelLabel, describeChannel, formatDate, packageChannelLabel, truncate } from './format';
import * as S from './state';
import { APP_NAME, BRAND, REPO_URL } from './constants';

export const api = new DiscordApi({
  getToken: () => S.discord.token.value?.token ?? null,
  fetch: (input, init) => nativeFetch(input, init),
});

// ---- logs & toasts -------------------------------------------------------------

let logId = 0;
export function log(level: LogLevel, key: string, params?: Params, sensitive = false) {
  S.logs.push({ id: ++logId, time: Date.now(), level, key, params, sensitive });
}

let toastId = 0;
export function toast(kind: S.Toast['kind'], key: I18nKey, params?: Params) {
  const id = ++toastId;
  S.toasts.value = [...S.toasts.value, { id, kind, text: t(key, params) }].slice(-4);
  setTimeout(() => dismissToast(id), 4500);
}
export const dismissToast = (id: number) => (S.toasts.value = S.toasts.value.filter(x => x.id !== id));

// ---- engine ----------------------------------------------------------------------

let lastOptions: EngineOptions | null = null;

export const engine = new WipeEngine(api, {
  onLog: (level, key, params) => log(level, key, params),
  onUpdate: () => scheduleSync(),
  onMessage: rec => onRecord(rec),
  onCheckpoint: () => schedulePersist(),
});

let syncTimer = 0;
function scheduleSync() {
  if (syncTimer) return;
  syncTimer = window.setTimeout(() => {
    syncTimer = 0;
    syncNow();
  }, 120);
}

function syncNow() {
  batch(() => {
    S.run.status.value = engine.status;
    S.run.stats.value = { ...engine.stats };
    S.run.jobs.value = engine.jobs.map(j => ({ ...j }));
  });
}

function onRecord(rec: MessageRecord) {
  if (rec.status === 'deleted') {
    if (S.settings.value.archive) S.archive.push(rec);
  } else {
    S.preview.results.push(rec);
  }
  S.run.recent.push(rec);
  const content = rec.content || rec.attachments.map(a => `📎 ${a.filename}`).join(' ');
  log('debug', 'log.message', { where: rec.where, date: formatDate(rec.timestamp), content: truncate(content, 140) }, true);
}

export const pause = () => engine.pause();
export const resume = () => engine.resume();
export const stop = () => engine.stop();

export function speedValues() {
  const s = S.settings.value;
  return s.speed === 'custom' ? { searchDelay: s.searchDelay, deleteDelay: s.deleteDelay } : S.SPEED_PRESETS[s.speed];
}

// Apply speed changes to a running engine.
effect(() => {
  const { searchDelay, deleteDelay } = speedValues();
  const adaptive = S.settings.value.adaptive;
  if (engine.isActive) engine.updateSpeed(searchDelay, deleteDelay, adaptive);
});

// ---- token & account ---------------------------------------------------------------

let checkingToken = false;

export async function refreshToken(): Promise<boolean> {
  if (checkingToken) return false;
  const found = resolveToken(S.discord.manualToken.value);
  if (!found) {
    if (S.discord.tokenState.value !== 'invalid') S.discord.tokenState.value = 'missing';
    return false;
  }
  if (S.discord.token.value?.token === found.token && S.discord.tokenState.value === 'ok') return true;
  checkingToken = true;
  S.discord.token.value = found;
  try {
    const me = await api.me();
    batch(() => {
      S.discord.me.value = me;
      S.discord.tokenState.value = 'ok';
    });
    log('info', 'log.tokenFound', { source: t(`token.${found.source}`) });
    log('success', 'log.loggedIn', { name: me.global_name || me.username });
    return true;
  } catch (err) {
    if (err instanceof DiscordApiError && err.status === 401) {
      batch(() => {
        S.discord.me.value = null;
        S.discord.tokenState.value = 'invalid';
      });
    }
    return false;
  } finally {
    checkingToken = false;
  }
}

export async function useManualToken(value: string) {
  if (!looksLikeToken(value)) return toast('error', 'toast.tokenBad');
  S.discord.manualToken.value = value.trim();
  S.discord.tokenState.value = 'detecting';
  const ok = await refreshToken();
  toast(ok ? 'success' : 'error', ok ? 'toast.tokenOk' : 'toast.tokenRejected');
}

export function forgetManualToken() {
  S.discord.manualToken.value = '';
  S.discord.token.value = null;
  S.discord.tokenState.value = 'detecting';
  void refreshToken();
}

// ---- location & lists ----------------------------------------------------------------

const channelCache = new Map<string, DiscordChannel>();

async function resolveLocation(loc: DiscordLocation) {
  S.discord.channelInfo.value = null;
  if (S.discord.tokenState.value !== 'ok') return;
  if (loc.guildId && loc.guildId !== '@me') void loadGuilds();
  if (!loc.channelId) return;
  const id = loc.channelId;
  try {
    let ch = channelCache.get(id);
    if (!ch) {
      ch = await api.channel(id);
      channelCache.set(id, ch);
    }
    if (S.discord.location.value.channelId === id) S.discord.channelInfo.value = describeChannel(ch);
  } catch {
    if (S.discord.location.value.channelId === id) {
      S.discord.channelInfo.value = { kind: loc.guildId === '@me' ? 'dm' : 'guild', name: t('target.unknownChannel', { id }), iconUrl: null };
    }
  }
}

export async function loadGuilds(force = false) {
  if ((S.discord.guilds.value && !force) || S.discord.guildsLoading.value) return;
  S.discord.guildsLoading.value = true;
  try {
    const list = await api.guilds();
    S.discord.guilds.value = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    S.discord.guilds.value ??= [];
  } finally {
    S.discord.guildsLoading.value = false;
  }
}

export async function loadDms(force = false) {
  if ((S.discord.dms.value && !force) || S.discord.dmsLoading.value) return;
  S.discord.dmsLoading.value = true;
  try {
    const list = await api.dmChannels();
    for (const ch of list) channelCache.set(ch.id, ch);
    S.discord.dms.value = [...list].sort((a, b) =>
      (b.last_message_id ?? '0').padStart(20, '0').localeCompare((a.last_message_id ?? '0').padStart(20, '0')));
  } catch {
    S.discord.dms.value ??= [];
  } finally {
    S.discord.dmsLoading.value = false;
  }
}

export function initDiscord() {
  watchLocation(loc => {
    S.discord.location.value = loc;
    void resolveLocation(loc);
  });
  onTokenCaptured(() => {
    if (S.discord.tokenState.value !== 'ok') void refreshToken();
  });
  effect(() => {
    if (S.discord.tokenState.value === 'ok') void resolveLocation(S.discord.location.peek());
  });
  void refreshToken();
  setInterval(() => {
    if (S.discord.tokenState.value === 'missing' || S.discord.tokenState.value === 'detecting') void refreshToken();
  }, 3000);
}

// ---- building runs ------------------------------------------------------------------------

export function buildFilter(): { filter: MessageFilter } | { error: I18nKey } {
  const f = S.filter.value;
  let authorIds: string[];
  if (f.authorMode === 'me') {
    const me = S.discord.me.value;
    if (!me) return { error: 'toast.noAccount' };
    authorIds = [me.id];
  } else {
    authorIds = f.authorCustom.split(/[\s,;]+/).filter(isSnowflake);
    if (!authorIds.length) return { error: 'toast.badAuthor' };
  }
  if (compileRegex(f.pattern).error) return { error: 'toast.badRegex' };
  const { authorMode: _m, authorCustom: _c, ...rest } = f;
  return { filter: { ...rest, authorIds } };
}

export function parseCustomTargets(text: string): JobTarget[] {
  const out: JobTarget[] = [];
  const seen = new Set<string>();
  for (const raw of text.split(/[\n,]+/)) {
    const line = raw.trim();
    if (!line) continue;
    let guildId: string | null = null;
    let channelId: string | null = null;
    const link = /channels\/(@me|\d{15,21})\/(\d{15,21})/.exec(line);
    const pair = /^(\d{15,21})\s*[/:]\s*(\d{15,21})$/.exec(line);
    if (link) [, guildId, channelId] = link;
    else if (pair) [, guildId, channelId] = pair;
    else if (isSnowflake(line)) channelId = line;
    if (!channelId || seen.has(channelId)) continue;
    seen.add(channelId);
    const cached = channelCache.get(channelId);
    out.push({
      kind: 'channel',
      guildId,
      channelId,
      label: cached ? channelLabel(describeChannel(cached)) : t('target.unknownChannel', { id: channelId }),
    });
  }
  return out;
}

export const dmLabel = (ch: DiscordChannel) => channelLabel(describeChannel(ch));

export function buildTargets(): JobTarget[] {
  const loc = S.discord.location.value;
  switch (S.target.mode.value) {
    case 'channel': {
      if (!loc.channelId) return [];
      const info = S.discord.channelInfo.value;
      const label = info ? channelLabel(info, S.currentGuild.value?.name) : t('target.unknownChannel', { id: loc.channelId });
      return [{ kind: 'channel', guildId: loc.guildId, channelId: loc.channelId, label }];
    }
    case 'guild': {
      const g = S.currentGuild.value;
      return g ? [{ kind: 'guild', guildId: g.id, label: g.name }] : [];
    }
    case 'dms': {
      const dms = S.discord.dms.value ?? [];
      return S.target.dms.value.flatMap(id => {
        const ch = dms.find(c => c.id === id);
        return ch ? [{ kind: 'channel' as const, guildId: '@me', channelId: id, label: dmLabel(ch) }] : [];
      });
    }
    case 'guilds': {
      const guilds = S.discord.guilds.value ?? [];
      return S.target.guilds.value.flatMap(id => {
        const g = guilds.find(x => x.id === id);
        return g ? [{ kind: 'guild' as const, guildId: id, label: g.name }] : [];
      });
    }
    case 'custom':
      return parseCustomTargets(S.target.custom.value);
  }
}

function engineOptions(filter: MessageFilter, dryRun: boolean): EngineOptions {
  const s = S.settings.value;
  return {
    filter,
    mode: s.mode,
    dryRun,
    ...speedValues(),
    adaptive: s.adaptive,
    maxAttempts: s.maxAttempts,
    emptyPageRetries: s.emptyPageRetries,
  };
}

// ---- confirmation ---------------------------------------------------------------------------

export const TYPE_TO_CONFIRM_ABOVE = 1000;

function confirmDeletion(targets: JobTarget[], filter: MessageFilter): Promise<boolean> {
  const known = targets.every(x => x.kind === 'ids');
  const countable = !known && targets.length <= 6;
  const controller = new AbortController();
  return new Promise<boolean>(resolve => {
    S.confirmDialog.value = {
      targets: targets.length,
      count: known ? targets.reduce((n, x) => n + (x.messages?.length ?? 0), 0) : null,
      counting: countable,
      resolve: ok => {
        controller.abort();
        S.confirmDialog.value = null;
        resolve(ok);
      },
    };
    if (!countable) return;
    void (async () => {
      let total = 0;
      try {
        for (const target of targets) total += await countMessages(api, target, filter, controller.signal);
        if (S.confirmDialog.value) S.confirmDialog.value = { ...S.confirmDialog.value, count: total, counting: false };
      } catch {
        if (S.confirmDialog.value) S.confirmDialog.value = { ...S.confirmDialog.value, counting: false };
      }
    })();
  });
}

// ---- running -----------------------------------------------------------------------------------

let jobSeq = 0;

async function runJobs(targets: JobTarget[], kind: 'delete' | 'preview', options: EngineOptions, existing?: Job[]) {
  const jobs = existing ?? targets.map(target => createJob(target, `job-${++jobSeq}`));
  lastOptions = options;
  batch(() => {
    S.run.kind.value = kind;
    S.run.recent.clear();
    if (kind === 'preview') {
      S.preview.results.clear();
      S.preview.excluded.value = new Set();
    }
    S.ui.tab.value = 'wipe';
    S.ui.wipeView.value = kind === 'preview' ? 'results' : 'run';
    if (kind === 'delete') S.savedSession.value = null;
  });
  await engine.run(jobs, options);
  syncNow();
  if (kind === 'delete') persistSession(true);
  announceEnd(kind);
}

function announceEnd(kind: 'delete' | 'preview') {
  const s = engine.stats;
  const s2 = S.settings.value;
  const [title, body] = kind === 'delete'
    ? [t('run.finishedTitle'), t('run.finishedBody', { deleted: s.deleted, failed: s.failed })]
    : [t('run.previewTitle'), t('run.previewBody', { n: s.matched })];
  if (s2.sound) playChime();
  if (s2.notify) desktopNotify(`${APP_NAME} — ${title}`, body);
}

export async function startWipe(kind: 'delete' | 'preview') {
  if (engine.isActive) return toast('warn', 'toast.busy');
  const built = buildFilter();
  if ('error' in built) return toast('error', built.error);
  const targets = buildTargets();
  if (!targets.length) return toast('warn', 'toast.noTarget');
  if (S.settings.value.mode === 'history' && targets.some(x => x.kind === 'guild')) toast('info', 'toast.historyGuild');
  if (kind === 'delete' && S.settings.value.confirm && !(await confirmDeletion(targets, built.filter))) return;
  await runJobs(targets, kind, engineOptions(built.filter, kind === 'preview'));
}

export async function deletePreviewSelection() {
  if (engine.isActive) return toast('warn', 'toast.busy');
  const excluded = S.preview.excluded.value;
  const chosen = S.preview.results.items.filter(r => !excluded.has(r.id));
  if (!chosen.length) return toast('warn', 'toast.nothingSelected');
  const built = buildFilter();
  if ('error' in built) return toast('error', built.error);
  const byChannel = new Map<string, MessageRecord[]>();
  for (const r of chosen) byChannel.set(r.channelId, [...(byChannel.get(r.channelId) ?? []), r]);
  const targets: JobTarget[] = [...byChannel].map(([channelId, list]) => ({
    kind: 'ids',
    guildId: list[0].guildId ?? '@me',
    channelId,
    label: list[0].where,
    messages: list.map(r => ({ id: r.id, content: r.content, attachments: r.attachments.map(a => a.url).join(' ') })),
    checkPins: false,
  }));
  if (S.settings.value.confirm && !(await confirmDeletion(targets, built.filter))) return;
  await runJobs(targets, 'delete', engineOptions(built.filter, false));
}

export const toggleExcluded = (id: string) => {
  const next = new Set(S.preview.excluded.value);
  if (!next.delete(id)) next.add(id);
  S.preview.excluded.value = next;
};

// ---- message counting (DM / server lists) ----------------------------------------------------------

let countController: AbortController | null = null;

export async function countList(kind: 'dms' | 'guilds') {
  if (engine.isActive || S.discord.counting.value) return;
  const built = buildFilter();
  if ('error' in built) return toast('error', built.error);
  const selected = kind === 'dms' ? S.target.dms.value : S.target.guilds.value;
  const all = kind === 'dms' ? (S.discord.dms.value ?? []).map(c => c.id) : (S.discord.guilds.value ?? []).map(g => g.id);
  const ids = selected.length ? selected : all;
  countController = new AbortController();
  const signal = countController.signal;
  S.discord.counting.value = { done: 0, total: ids.length };
  try {
    for (const [i, id] of ids.entries()) {
      S.discord.counts.value = { ...S.discord.counts.value, [id]: 'loading' };
      const target: JobTarget = kind === 'dms'
        ? { kind: 'channel', guildId: '@me', channelId: id, label: id }
        : { kind: 'guild', guildId: id, label: id };
      let value: number | 'error';
      try {
        value = await countMessages(api, target, built.filter, signal);
      } catch (err) {
        if (isAbortError(err)) throw err;
        value = 'error';
      }
      S.discord.counts.value = { ...S.discord.counts.value, [id]: value };
      S.discord.counting.value = { done: i + 1, total: ids.length };
      await sleep(speedValues().searchDelay, signal);
    }
  } catch (err) {
    if (!isAbortError(err)) throw err;
    const counts = { ...S.discord.counts.value };
    for (const [id, v] of Object.entries(counts)) if (v === 'loading') delete counts[id];
    S.discord.counts.value = counts;
  } finally {
    S.discord.counting.value = null;
    countController = null;
  }
}

export const cancelCount = () => countController?.abort();

// ---- message picker -------------------------------------------------------------------------------

export async function pickBound(which: 'after' | 'before') {
  S.ui.open.value = false;
  const id = await pickMessage(t('filters.pickBanner'), t('action.cancel'));
  S.ui.open.value = true;
  if (id) S.updateFilter(which === 'after' ? { afterId: id } : { beforeId: id });
}

// ---- data package -------------------------------------------------------------------------------

export async function loadPackage(files: File[]) {
  if (!files.length) return;
  batch(() => {
    S.pkg.loading.value = true;
    S.pkg.error.value = null;
  });
  await sleep(30); // let the "reading" state paint before the synchronous unzip
  try {
    const data = await parsePackageInput(files);
    if (!data.channels.length) throw new Error(t('pkg.noMessages'));
    batch(() => {
      S.pkg.data.value = data;
      S.pkg.selected.value = new Set(data.channels.map(c => c.id));
    });
    log('success', 'log.packageLoaded', { channels: data.channels.length, messages: data.totalMessages });
  } catch (err) {
    S.pkg.error.value = (err as Error).message || String(err);
  } finally {
    S.pkg.loading.value = false;
  }
}

/** Messages of a package channel that pass the current filters. */
export function packageMatcher(): ((ch: PackageChannel) => PackageChannel['messages']) | null {
  const built = buildFilter();
  const filter = 'filter' in built ? built.filter : { ...S.filter.value, authorIds: [] };
  if (compileRegex(filter.pattern).error) return null;
  const match = createPackageMatcher(filter);
  return ch => ch.messages.filter(m => match(m) === null);
}

export async function startPackageWipe(kind: 'delete' | 'preview') {
  if (engine.isActive) return toast('warn', 'toast.busy');
  const data = S.pkg.data.value;
  if (!data) return;
  const built = buildFilter();
  if ('error' in built) return toast('error', built.error);
  const matcher = packageMatcher()!;
  const selected = S.pkg.selected.value;
  const targets: JobTarget[] = [];
  for (const ch of data.channels) {
    if (!selected.has(ch.id)) continue;
    const label = packageChannelLabel(ch);
    if (!ch.messages.length) {
      // index.json-only import: fall back to searching the channel.
      targets.push({ kind: 'channel', guildId: ch.kind === 'guild' ? ch.guildId : ch.kind === 'unknown' ? null : '@me', channelId: ch.id, label });
      continue;
    }
    const messages = matcher(ch);
    if (messages.length) {
      targets.push({ kind: 'ids', guildId: ch.guildId ?? '@me', channelId: ch.id, label, messages, checkPins: true });
    }
  }
  if (!targets.length) return toast('warn', 'toast.nothingSelected');
  if (kind === 'delete' && S.settings.value.confirm && !(await confirmDeletion(targets, built.filter))) return;
  await runJobs(targets, kind, engineOptions(built.filter, kind === 'preview'));
}

// ---- resumable sessions ------------------------------------------------------------------------------

const MAX_SAVED_IDS = 60_000;
let persistTimer = 0;

function schedulePersist() {
  if (persistTimer || engine.dryRun) return;
  persistTimer = window.setTimeout(() => {
    persistTimer = 0;
    persistSession(false);
  }, 2500);
}

function persistSession(final: boolean) {
  if (!lastOptions || lastOptions.dryRun) return;
  const unfinished = engine.jobs.filter(j => j.status !== 'done' && j.status !== 'skipped');
  if (!unfinished.length) {
    remove('session');
    S.savedSession.value = null;
    return;
  }
  let budget = MAX_SAVED_IDS;
  const jobs: Job[] = [];
  for (const j of engine.jobs) {
    if (j.target.kind !== 'ids' || j.status === 'done' || j.status === 'skipped') {
      jobs.push({ ...j, target: { ...j.target, messages: undefined } });
      continue;
    }
    const rest = sortNewestFirst(j.target.messages ?? []).slice(Number(j.cursor ?? 0) || 0);
    if (rest.length > budget) continue; // too big to store: this job can't be resumed
    budget -= rest.length;
    jobs.push({ ...j, cursor: undefined, target: { ...j.target, messages: rest.map(m => ({ id: m.id })) } });
  }
  const snapshot: S.SessionSnapshot = { savedAt: Date.now(), options: lastOptions, jobs };
  save('session', snapshot);
  if (final) S.savedSession.value = snapshot;
}

export async function resumeSession() {
  const snap = S.savedSession.value;
  if (!snap || engine.isActive) return;
  const jobs = snap.jobs.map(j => (j.status === 'done' || j.status === 'skipped' ? j : { ...j, status: 'pending' as const }));
  const options: EngineOptions = {
    ...snap.options,
    ...speedValues(),
    adaptive: S.settings.value.adaptive,
  };
  await runJobs(jobs.map(j => j.target), 'delete', options, jobs);
}

export function discardSession() {
  remove('session');
  S.savedSession.value = null;
}

// ---- exports ------------------------------------------------------------------------------------------

export function exportRecords(records: MessageRecord[], format: ArchiveFormat, name: string) {
  const file = `${name}-${timestampForFile()}`;
  const credit = { text: BRAND, url: REPO_URL };
  if (format === 'json') downloadFile(archiveToJson(records, credit), `${file}.json`, 'application/json');
  else if (format === 'csv') downloadFile(archiveToCsv(records), `${file}.csv`, 'text/csv;charset=utf-8');
  else downloadFile(archiveToHtml(records, name, credit), `${file}.html`, 'text/html;charset=utf-8');
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast('success', 'toast.copied');
  } catch { /* clipboard blocked */ }
}
