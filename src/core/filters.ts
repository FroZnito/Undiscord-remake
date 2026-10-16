import type { DiscordMessage, PackageMessage } from './types';
import { compareSnowflakes, dateToSnowflake, isSnowflake } from './snowflake';

export type HasKind = 'link' | 'embed' | 'file' | 'image' | 'video' | 'sound' | 'sticker' | 'poll';
export const HAS_KINDS: HasKind[] = ['link', 'file', 'image', 'video', 'embed', 'sound', 'sticker', 'poll'];

/** Kinds we can verify from a data package entry (content + attachment urls only). */
export const PACKAGE_VERIFIABLE: HasKind[] = ['link', 'file', 'image', 'video', 'sound'];

export type PinnedMode = 'include' | 'exclude' | 'only';

export interface MessageFilter {
  /** Authors whose messages may be deleted. Empty means "anyone" (needs moderator rights). */
  authorIds: string[];
  /** Server-side "contains" search. */
  content: string;
  /** Local regular expression, `foo` or `/foo/flags`. */
  pattern: string;
  /** Message must have all of these. */
  has: HasKind[];
  /** Message must have none of these (checked locally). */
  exclude: HasKind[];
  pinned: PinnedMode;
  includeNsfw: boolean;
  afterId: string;
  beforeId: string;
  /** `datetime-local` values (local time) or ''. */
  afterDate: string;
  beforeDate: string;
}

export function defaultFilter(): MessageFilter {
  return {
    authorIds: [],
    content: '',
    pattern: '',
    has: [],
    exclude: [],
    pinned: 'exclude',
    includeNsfw: true,
    afterId: '',
    beforeId: '',
    afterDate: '',
    beforeDate: '',
  };
}

/** Message types that can never be deleted (calls, recipient changes, thread starters...). */
const NON_DELETABLE_TYPES = new Set([1, 2, 3, 4, 5, 21]);
export const isDeletableType = (type: number) => !NON_DELETABLE_TYPES.has(type);

export interface Bounds {
  /** Exclusive lower bound. */
  minId?: string;
  /** Exclusive upper bound. */
  maxId?: string;
}

export function computeBounds(f: MessageFilter): Bounds {
  const lows: string[] = [];
  const highs: string[] = [];
  if (isSnowflake(f.afterId.trim())) lows.push(f.afterId.trim());
  if (isSnowflake(f.beforeId.trim())) highs.push(f.beforeId.trim());
  if (f.afterDate && !Number.isNaN(Date.parse(f.afterDate))) lows.push(dateToSnowflake(f.afterDate));
  if (f.beforeDate && !Number.isNaN(Date.parse(f.beforeDate))) highs.push(dateToSnowflake(f.beforeDate));
  return {
    minId: lows.length ? lows.reduce((a, b) => (compareSnowflakes(a, b) > 0 ? a : b)) : undefined,
    maxId: highs.length ? highs.reduce((a, b) => (compareSnowflakes(a, b) < 0 ? a : b)) : undefined,
  };
}

export function inBounds(id: string, b: Bounds): boolean {
  if (b.minId && compareSnowflakes(id, b.minId) <= 0) return false;
  if (b.maxId && compareSnowflakes(id, b.maxId) >= 0) return false;
  return true;
}

export type RegexResult = { regex: RegExp | null; error?: string };

export function compileRegex(pattern: string): RegexResult {
  const src = pattern.trim();
  if (!src) return { regex: null };
  try {
    const literal = /^\/(.+)\/([dgimsuvy]*)$/s.exec(src);
    if (literal) return { regex: new RegExp(literal[1], literal[2].replace('g', '')) };
    return { regex: new RegExp(src, 'i') };
  } catch (err) {
    return { regex: null, error: (err as Error).message };
  }
}

export const normalizeText = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const LINK_RE = /https?:\/\/\S+/i;
const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|bmp|heic)(\?|$)/i;
const VIDEO_RE = /\.(mp4|mov|webm|mkv|avi|m4v)(\?|$)/i;
const SOUND_RE = /\.(mp3|ogg|wav|flac|m4a|opus|aac)(\?|$)/i;

export function messageHas(m: DiscordMessage, kind: HasKind): boolean {
  const atts = m.attachments ?? [];
  const embeds = m.embeds ?? [];
  const attIs = (mime: string, re: RegExp) =>
    atts.some(a => a.content_type?.startsWith(mime) || re.test(a.filename) || re.test(a.url));
  switch (kind) {
    case 'link': return LINK_RE.test(m.content) || embeds.some(e => !!e.url);
    case 'embed': return embeds.length > 0;
    case 'file': return atts.length > 0;
    case 'image': return attIs('image/', IMAGE_RE) || embeds.some(e => e.type === 'image' || e.type === 'gifv');
    case 'video': return attIs('video/', VIDEO_RE) || embeds.some(e => e.type === 'video');
    case 'sound': return attIs('audio/', SOUND_RE);
    case 'sticker': return (m.sticker_items?.length ?? 0) > 0;
    case 'poll': return !!m.poll;
  }
}

export function packageMessageHas(m: PackageMessage, kind: HasKind): boolean | null {
  const urls = (m.attachments ?? '').split(/\s+/).filter(Boolean);
  switch (kind) {
    case 'link': return LINK_RE.test(m.content ?? '');
    case 'file': return urls.length > 0;
    case 'image': return urls.some(u => IMAGE_RE.test(u));
    case 'video': return urls.some(u => VIDEO_RE.test(u));
    case 'sound': return urls.some(u => SOUND_RE.test(u));
    default: return null; // not knowable from a data package
  }
}

export type SkipReason =
  | 'system' | 'author' | 'range' | 'pinned' | 'content' | 'has' | 'exclude' | 'pattern' | 'unverifiable';

export interface MatchOptions {
  /** True when Discord's search already applied content/has filters. */
  serverFiltered: boolean;
}

export function createMatcher(f: MessageFilter, opts: MatchOptions) {
  const bounds = computeBounds(f);
  const { regex } = compileRegex(f.pattern);
  const content = normalizeText(f.content.trim());
  const authors = new Set(f.authorIds.filter(Boolean));

  return (m: DiscordMessage): SkipReason | null => {
    if (!isDeletableType(m.type)) return 'system';
    if (authors.size && !authors.has(m.author?.id)) return 'author';
    if (!inBounds(m.id, bounds)) return 'range';
    if (f.pinned === 'exclude' && m.pinned) return 'pinned';
    if (f.pinned === 'only' && !m.pinned) return 'pinned';
    if (!opts.serverFiltered) {
      if (content && !normalizeText(m.content ?? '').includes(content)) return 'content';
      if (f.has.some(k => !messageHas(m, k))) return 'has';
    }
    if (f.exclude.some(k => messageHas(m, k))) return 'exclude';
    if (regex && !regex.test(m.content ?? '')) return 'pattern';
    return null;
  };
}

/**
 * Matcher for data-package entries. Anything we cannot verify for a "has"
 * requirement is skipped: when unsure, never delete.
 */
export function createPackageMatcher(f: MessageFilter) {
  const bounds = computeBounds(f);
  const { regex } = compileRegex(f.pattern);
  const content = normalizeText(f.content.trim());

  return (m: PackageMessage): SkipReason | null => {
    if (!inBounds(m.id, bounds)) return 'range';
    if (content && !normalizeText(m.content ?? '').includes(content)) return 'content';
    for (const k of f.has) {
      const v = packageMessageHas(m, k);
      if (v === null) return 'unverifiable';
      if (!v) return 'has';
    }
    if (f.exclude.some(k => packageMessageHas(m, k) === true)) return 'exclude';
    if (regex && !regex.test(m.content ?? '')) return 'pattern';
    return null;
  };
}

/** Query parameters for Discord's message search endpoint. */
export function buildSearchQuery(
  f: MessageFilter,
  cursor: { minId?: string; maxId?: string; offset?: number },
  channelId?: string,
): [string, string][] {
  const q: [string, string][] = [];
  for (const a of f.authorIds.filter(Boolean)) q.push(['author_id', a]);
  if (channelId) q.push(['channel_id', channelId]);
  if (f.content.trim()) q.push(['content', f.content.trim()]);
  for (const h of f.has) q.push(['has', h]);
  if (f.pinned === 'only') q.push(['pinned', 'true']);
  if (cursor.minId) q.push(['min_id', cursor.minId]);
  if (cursor.maxId) q.push(['max_id', cursor.maxId]);
  if (f.includeNsfw) q.push(['include_nsfw', 'true']);
  q.push(['sort_by', 'timestamp'], ['sort_order', 'desc']);
  if (cursor.offset) q.push(['offset', String(cursor.offset)]);
  return q;
}
