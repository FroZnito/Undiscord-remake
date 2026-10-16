import { DiscordApi, DiscordApiError, ErrorCode } from './api';
import {
  buildSearchQuery, computeBounds, createMatcher, type MessageFilter, type SkipReason,
} from './filters';
import { compareSnowflakes, minSnowflake, snowflakeToDate, sortNewestFirst } from './snowflake';
import type { DiscordMessage, MessageRecord, PackageMessage, SearchResponse } from './types';
import { AbortedError, clamp, isAbortError, sleep as defaultSleep, type Sleeper } from './util';

// ---- jobs -------------------------------------------------------------------

export type TargetKind = 'channel' | 'guild' | 'ids';

export interface JobTarget {
  kind: TargetKind;
  /** Guild id, or null / '@me' for direct messages. */
  guildId: string | null;
  channelId?: string;
  label: string;
  /** For `ids` targets: the exact messages to delete (already filtered). */
  messages?: PackageMessage[];
  /** For `ids` targets: fetch the channel pins and honour the pinned filter. */
  checkPins?: boolean;
  /** For `guild` targets: channels (and their threads) to leave untouched. */
  excludeChannelIds?: string[];
}

export type JobStatus = 'pending' | 'running' | 'done' | 'skipped' | 'failed' | 'stopped';

export interface Job {
  id: string;
  target: JobTarget;
  status: JobStatus;
  deleted: number;
  failed: number;
  skipped: number;
  matched: number;
  scanned: number;
  /** Estimated number of candidate messages (null = unknown yet). */
  total: number | null;
  /** search/history: oldest processed id. ids: next index. */
  cursor?: string;
  error?: string;
}

export function createJob(target: JobTarget, id: string): Job {
  return { id, target, status: 'pending', deleted: 0, failed: 0, skipped: 0, matched: 0, scanned: 0, total: null };
}

export const jobProcessed = (j: Job) => j.deleted + j.failed + j.skipped + j.matched;

// ---- engine options / events -------------------------------------------------

export type EngineMode = 'search' | 'history';

export interface EngineOptions {
  filter: MessageFilter;
  mode: EngineMode;
  /** Preview: find matching messages without deleting anything. */
  dryRun: boolean;
  searchDelay: number;
  deleteDelay: number;
  adaptive: boolean;
  maxAttempts: number;
  emptyPageRetries: number;
}

export type EngineStatus = 'idle' | 'running' | 'paused' | 'stopping' | 'finished';
export type LogLevel = 'debug' | 'info' | 'success' | 'warn' | 'error';

export interface EngineStats {
  deleted: number;
  failed: number;
  skipped: number;
  matched: number;
  scanned: number;
  rateLimits: number;
  rateLimitedMs: number;
  elapsedMs: number;
  delay: number;
  speedPerMin: number;
  etaMs: number | null;
  total: number | null;
  processed: number;
}

export interface EngineEvents {
  /** `key` is an i18n key, so the core stays language-agnostic. */
  onLog?(level: LogLevel, key: string, params?: Record<string, string | number>): void;
  onUpdate?(): void;
  onMessage?(record: MessageRecord): void;
  /** Called after each page so the caller can persist a resumable snapshot. */
  onCheckpoint?(): void;
}

export interface EngineDeps {
  sleep?: Sleeper;
  now?: () => number;
}

// ---- adaptive delay ---------------------------------------------------------

export class AdaptiveDelay {
  current: number;
  private streak = 0;

  constructor(private floor: number, private adaptive: boolean, private ceiling = 30_000) {
    this.current = floor;
  }

  onSuccess() {
    if (!this.adaptive || this.current <= this.floor) return;
    if (++this.streak >= 15) {
      this.current = Math.max(this.floor, Math.round(this.current * 0.85));
      this.streak = 0;
    }
  }

  onRateLimit(waitMs: number) {
    this.streak = 0;
    if (!this.adaptive) return;
    this.current = clamp(Math.round(Math.max(this.current * 1.5, waitMs / 4)), this.floor, this.ceiling);
  }
}

// ---- helpers ----------------------------------------------------------------

/** Search results are grouped; each group holds the hit (and sometimes context). */
export function extractHits(res: SearchResponse): DiscordMessage[] {
  const out: DiscordMessage[] = [];
  for (const group of res?.messages ?? []) {
    if (!Array.isArray(group)) {
      if (group && typeof group === 'object') out.push(group as DiscordMessage);
      continue;
    }
    if (!group.length) continue;
    out.push(group.length === 1 ? group[0] : group.find(m => m.hit) ?? group[Math.floor(group.length / 2)]);
  }
  return out;
}

interface Candidate {
  id: string;
  channelId: string;
  content: string;
  timestamp: string;
  author: string;
  attachments: { filename: string; url: string }[];
}

const fromDiscord = (m: DiscordMessage): Candidate => ({
  id: m.id,
  channelId: m.channel_id,
  content: m.content ?? '',
  timestamp: m.timestamp,
  author: m.author?.global_name || m.author?.username || '',
  attachments: (m.attachments ?? []).map(a => ({ filename: a.filename, url: a.url })),
});

const fromPackage = (m: PackageMessage, channelId: string): Candidate => ({
  id: m.id,
  channelId,
  content: m.content ?? '',
  // The snowflake carries the exact creation time; package timestamps have no timezone.
  timestamp: snowflakeToDate(m.id).toISOString(),
  author: '',
  attachments: (m.attachments ?? '').split(/\s+/).filter(Boolean)
    .map(url => ({ url, filename: decodeURIComponent(url.split('?')[0].split('/').pop() || 'file') })),
});

type DeleteOutcome = 'deleted' | 'gone' | 'forbidden' | 'archived' | 'system' | 'failed';

/** One search request to count matching messages for a target (best effort). */
export async function countMessages(
  api: DiscordApi, target: JobTarget, filter: MessageFilter, signal?: AbortSignal,
): Promise<number> {
  if (target.kind === 'ids') return target.messages?.length ?? 0;
  const bounds = computeBounds(filter);
  const channelParam = target.kind === 'channel' && target.guildId && target.guildId !== '@me' ? target.channelId : undefined;
  const res = await api.search(
    { guildId: target.guildId, channelId: target.channelId },
    buildSearchQuery(filter, { minId: bounds.minId, maxId: bounds.maxId }, channelParam),
    signal,
  );
  return res.total_results ?? 0;
}

// ---- engine -----------------------------------------------------------------

export class WipeEngine {
  status: EngineStatus = 'idle';
  jobs: Job[] = [];
  currentJob: Job | null = null;
  lastRecord: MessageRecord | null = null;
  stats: EngineStats = WipeEngine.emptyStats();

  private options!: EngineOptions;
  private controller: AbortController | null = null;
  private pauseGate: Promise<void> | null = null;
  private releasePause: (() => void) | null = null;
  private delay = new AdaptiveDelay(1000, false);
  private recent: number[] = [];
  private activeSince = 0;
  private activeAccum = 0;
  private readonly sleep: Sleeper;
  private readonly now: () => number;

  constructor(private api: DiscordApi, private events: EngineEvents = {}, deps: EngineDeps = {}) {
    this.sleep = deps.sleep ?? defaultSleep;
    this.now = deps.now ?? Date.now;
  }

  static emptyStats(): EngineStats {
    return {
      deleted: 0, failed: 0, skipped: 0, matched: 0, scanned: 0, rateLimits: 0, rateLimitedMs: 0,
      elapsedMs: 0, delay: 0, speedPerMin: 0, etaMs: null, total: null, processed: 0,
    };
  }

  get isActive() {
    return this.status === 'running' || this.status === 'paused' || this.status === 'stopping';
  }

  get dryRun() {
    return this.options?.dryRun ?? false;
  }

  // ---- control --------------------------------------------------------------

  pause() {
    if (this.status !== 'running') return;
    this.status = 'paused';
    this.activeAccum += this.now() - this.activeSince;
    this.pauseGate = new Promise(resolve => (this.releasePause = resolve));
    this.log('info', 'log.paused');
    this.emit();
  }

  resume() {
    if (this.status !== 'paused') return;
    this.status = 'running';
    this.activeSince = this.now();
    this.releasePause?.();
    this.pauseGate = null;
    this.releasePause = null;
    this.log('info', 'log.resumed');
    this.emit();
  }

  stop() {
    if (!this.isActive) return;
    if (this.status === 'paused') this.activeSince = this.now();
    this.status = 'stopping';
    this.controller?.abort();
    this.releasePause?.();
    this.pauseGate = null;
    this.emit();
  }

  /** Lets the UI change speed while a run is in progress. */
  updateSpeed(searchDelay: number, deleteDelay: number, adaptive: boolean) {
    if (!this.options) return;
    this.options.searchDelay = searchDelay;
    this.options.deleteDelay = deleteDelay;
    this.options.adaptive = adaptive;
    this.delay = new AdaptiveDelay(deleteDelay, adaptive);
    this.emit();
  }

  // ---- main loop ------------------------------------------------------------

  async run(jobs: Job[], options: EngineOptions): Promise<void> {
    if (this.isActive) throw new Error('Engine already running');
    this.options = { ...options };
    this.jobs = jobs;
    this.stats = WipeEngine.emptyStats();
    this.recent = [];
    this.lastRecord = null;
    this.activeAccum = 0;
    this.activeSince = this.now();
    this.delay = new AdaptiveDelay(options.deleteDelay, options.adaptive);
    this.controller = new AbortController();
    this.status = 'running';

    this.api.hooks = {
      onRateLimit: info => {
        this.stats.rateLimits++;
        this.stats.rateLimitedMs += info.waitMs;
        this.delay.onRateLimit(info.waitMs);
        this.log('warn', info.global ? 'log.rateLimitedGlobal' : 'log.rateLimited', {
          seconds: (info.waitMs / 1000).toFixed(1),
          delay: this.delay.current,
        });
        this.emit();
      },
      onIndexing: waitMs => this.log('info', 'log.indexing', { seconds: (waitMs / 1000).toFixed(1) }),
      onRetry: (reason, attempt, waitMs) =>
        this.log('warn', 'log.retry', { reason, attempt, seconds: (waitMs / 1000).toFixed(1) }),
    };

    this.log('info', options.dryRun ? 'log.previewStart' : 'log.start', { jobs: jobs.length });
    this.emit();

    let fatal = false;
    try {
      for (const job of jobs) {
        if (job.status === 'done' || job.status === 'skipped') continue;
        await this.checkpoint();
        this.currentJob = job;
        job.status = 'running';
        job.error = undefined;
        this.log('info', 'log.jobStart', { label: job.target.label, index: jobs.indexOf(job) + 1, count: jobs.length });
        this.emit();
        try {
          await this.runJob(job);
          job.status = 'done';
          this.log('success', 'log.jobDone', {
            label: job.target.label, deleted: job.deleted, matched: job.matched, failed: job.failed, skipped: job.skipped,
          });
        } catch (err) {
          if (isAbortError(err)) {
            job.status = 'stopped';
            throw err;
          }
          if (err instanceof DiscordApiError && err.status === 401) {
            job.status = 'failed';
            job.error = 'unauthorized';
            fatal = true;
            this.log('error', 'log.unauthorized');
            throw err;
          }
          if (err instanceof DiscordApiError && (err.status === 403 || err.status === 404)) {
            job.status = 'skipped';
            job.error = 'inaccessible';
            this.log('warn', 'log.jobInaccessible', { label: job.target.label });
          } else {
            job.status = 'failed';
            job.error = (err as Error).message;
            this.log('error', 'log.jobFailed', { label: job.target.label, error: (err as Error).message });
          }
        } finally {
          // Settled jobs count for what was actually processed, so the overall progress can reach 100%.
          if (job.status !== 'stopped') job.total = jobProcessed(job);
          this.events.onCheckpoint?.();
          this.emit();
        }
      }
    } catch (err) {
      if (isAbortError(err)) this.log('warn', 'log.stopped');
      else if (!fatal) this.log('error', 'log.unexpected', { error: (err as Error).message });
    } finally {
      // A paused run can only end through stop(), which restarts activeSince.
      this.activeAccum += this.now() - this.activeSince;
      this.status = 'finished';
      this.currentJob = null;
      this.api.hooks = undefined;
      this.computeStats();
      this.log('success', this.options.dryRun ? 'log.previewFinished' : 'log.finished', {
        deleted: this.stats.deleted, matched: this.stats.matched, failed: this.stats.failed, skipped: this.stats.skipped,
      });
      this.events.onCheckpoint?.();
      this.emit();
    }
  }

  private runJob(job: Job) {
    switch (job.target.kind) {
      case 'ids': return this.runIdsJob(job);
      case 'guild': return this.runSearchJob(job);
      case 'channel': return this.options.mode === 'history' ? this.runHistoryJob(job) : this.runSearchJob(job);
    }
  }

  /** Search mode: walks Discord's search index from newest to oldest using a max_id cursor. */
  private async runSearchJob(job: Job) {
    const { filter } = this.options;
    const t = job.target;
    if (t.kind === 'channel' && t.guildId === null && t.channelId) {
      // Unknown location (e.g. index.json import): guild channels must be searched through their guild.
      try {
        const ch = await this.api.channel(t.channelId, this.signal);
        t.guildId = ch.guild_id ?? '@me';
      } catch (err) {
        if (isAbortError(err) || (err instanceof DiscordApiError && [401, 403, 404].includes(err.status))) throw err;
        t.guildId = '@me';
      }
    }
    const scope = { guildId: t.guildId, channelId: t.channelId };
    const channelParam = t.kind === 'channel' && t.guildId && t.guildId !== '@me' ? t.channelId : undefined;
    const bounds = computeBounds(filter);
    const matcher = createMatcher(filter, { serverFiltered: true });
    const excluded = new Set(t.kind === 'guild' ? t.excludeChannelIds ?? [] : []);
    const parents = new Map<string, string | null>();
    const seen = new Set<string>();
    let cursor = job.cursor ?? bounds.maxId;
    let emptyStreak = 0;

    for (;;) {
      await this.checkpoint();
      const res = await this.api.search(
        scope,
        buildSearchQuery(filter, { minId: bounds.minId, maxId: cursor }, channelParam),
        this.signal,
      );
      // Drop anything at or above the cursor in case max_id is ever treated as inclusive.
      const hits = extractHits(res).filter(m => !cursor || compareSnowflakes(m.id, cursor) < 0);
      // Everything older than the cursor is still to do, so this estimate stays accurate.
      job.total = jobProcessed(job) + (res.total_results ?? 0);
      this.emit();

      if (!hits.length) {
        if ((res.total_results ?? 0) > 0 && emptyStreak < this.options.emptyPageRetries) {
          emptyStreak++;
          this.log('warn', 'log.emptyPage', { attempt: emptyStreak, max: this.options.emptyPageRetries });
          await this.wait(this.options.searchDelay * (emptyStreak + 1));
          continue;
        }
        break;
      }
      emptyStreak = 0;
      cursor = minSnowflake(hits.map(m => m.id));
      for (const th of res.threads ?? []) parents.set(th.id, th.parent_id ?? null);

      for (const msg of sortNewestFirst(hits)) {
        if (seen.has(msg.id)) continue;
        seen.add(msg.id);
        job.scanned++;
        this.stats.scanned++;
        let reason = matcher(msg);
        if (!reason && excluded.size && (await this.inExcludedChannel(msg.channel_id, excluded, parents))) reason = 'channel';
        await this.handle(job, fromDiscord(msg), reason);
      }
      job.cursor = cursor;
      this.events.onCheckpoint?.();
      await this.wait(this.options.searchDelay);
    }
  }

  /** True when a message's channel, or the parent of its thread, is excluded. */
  private async inExcludedChannel(channelId: string, excluded: Set<string>, parents: Map<string, string | null>) {
    if (excluded.has(channelId)) return true;
    if (!parents.has(channelId)) {
      // Unknown channel: look it up once to learn whether it is a thread of an excluded channel.
      try {
        parents.set(channelId, (await this.api.channel(channelId, this.signal)).parent_id ?? null);
      } catch (err) {
        if (isAbortError(err)) throw err;
        parents.set(channelId, null);
      }
    }
    const parent = parents.get(channelId);
    return !!parent && excluded.has(parent);
  }

  /** History mode: reads the whole channel 100 messages at a time. Slow but independent of search. */
  private async runHistoryJob(job: Job) {
    const { filter } = this.options;
    const channelId = job.target.channelId!;
    const bounds = computeBounds(filter);
    const matcher = createMatcher(filter, { serverFiltered: false });
    const authors = new Set(filter.authorIds.filter(Boolean));
    let before = job.cursor ?? bounds.maxId;

    if (job.total === null) {
      try {
        job.total = await countMessages(this.api, job.target, filter, this.signal);
      } catch (err) {
        if (isAbortError(err)) throw err;
      }
    }

    for (;;) {
      await this.checkpoint();
      const page = await this.api.messages(channelId, { before, limit: 100 }, this.signal);
      if (!page?.length) break;
      let reachedStart = false;
      for (const msg of sortNewestFirst(page)) {
        if (bounds.minId && compareSnowflakes(msg.id, bounds.minId) <= 0) {
          reachedStart = true;
          break;
        }
        job.scanned++;
        this.stats.scanned++;
        if (authors.size && !authors.has(msg.author?.id)) continue;
        await this.handle(job, fromDiscord(msg), matcher(msg));
      }
      before = minSnowflake(page.map(m => m.id));
      job.cursor = before;
      if (job.total !== null && jobProcessed(job) > job.total) job.total = jobProcessed(job);
      this.events.onCheckpoint?.();
      this.emit();
      if (reachedStart || page.length < 100) break;
      await this.wait(Math.max(300, Math.round(this.options.searchDelay / 2)));
    }
  }

  /** Ids mode: deletes a known list of messages (data package or preview selection). */
  private async runIdsJob(job: Job) {
    const t = job.target;
    const channelId = t.channelId!;
    const messages = sortNewestFirst(t.messages ?? []);
    const { filter } = this.options;
    job.total = messages.length;
    this.emit();

    // Fail fast on channels we no longer have access to (left servers, deleted channels...).
    try {
      await this.api.channel(channelId, this.signal);
    } catch (err) {
      if (isAbortError(err) || (err instanceof DiscordApiError && [401, 403, 404].includes(err.status))) throw err;
    }

    let pinned: Set<string> | null = null;
    if (t.checkPins && filter.pinned !== 'include') {
      try {
        pinned = await this.api.pinnedIds(channelId, this.signal);
      } catch (err) {
        if (isAbortError(err)) throw err;
        this.log('warn', 'log.pinsUnavailable', { label: t.label });
        if (filter.pinned === 'only') return;
      }
    }

    let forbiddenStreak = 0;
    for (let i = Number(job.cursor ?? 0) || 0; i < messages.length; i++) {
      await this.checkpoint();
      const pm = messages[i];
      job.scanned++;
      this.stats.scanned++;
      let reason: SkipReason | null = null;
      if (pinned) {
        const isPinned = pinned.has(pm.id);
        if ((filter.pinned === 'exclude' && isPinned) || (filter.pinned === 'only' && !isPinned)) reason = 'pinned';
      }
      const outcome = await this.handle(job, fromPackage(pm, channelId), reason);
      job.cursor = String(i + 1);
      if (outcome === 'forbidden') {
        if (++forbiddenStreak >= 3) throw new DiscordApiError(403, ErrorCode.MISSING_ACCESS, 'Missing access');
      } else if (outcome) {
        forbiddenStreak = 0;
      }
      if (i % 25 === 24) this.events.onCheckpoint?.();
    }
  }

  // ---- per message ----------------------------------------------------------

  private async handle(job: Job, c: Candidate, reason: SkipReason | null): Promise<DeleteOutcome | null> {
    const where = job.target.label;
    if (reason) {
      job.skipped++;
      this.stats.skipped++;
      this.tick();
      return null;
    }
    if (this.options.dryRun) {
      job.matched++;
      this.stats.matched++;
      this.record(c, where, job.target.guildId, 'matched');
      this.tick();
      return null;
    }

    await this.checkpoint();
    const outcome = await this.deleteOne(c.channelId, c.id);
    switch (outcome) {
      case 'deleted':
        job.deleted++;
        this.stats.deleted++;
        this.record(c, where, job.target.guildId, 'deleted');
        break;
      case 'gone':
      case 'system':
        job.skipped++;
        this.stats.skipped++;
        break;
      case 'archived':
        job.failed++;
        this.stats.failed++;
        this.log('warn', 'log.threadArchived', { id: c.id });
        break;
      case 'forbidden':
        job.failed++;
        this.stats.failed++;
        this.log('warn', 'log.forbidden', { id: c.id });
        break;
      case 'failed':
        job.failed++;
        this.stats.failed++;
        this.log('error', 'log.deleteFailed', { id: c.id });
        break;
    }
    this.tick();
    await this.wait(this.delay.current);
    return outcome;
  }

  private async deleteOne(channelId: string, messageId: string): Promise<DeleteOutcome> {
    for (let attempt = 1; ; attempt++) {
      try {
        await this.api.deleteMessage(channelId, messageId, this.signal);
        this.delay.onSuccess();
        return 'deleted';
      } catch (err) {
        if (isAbortError(err)) throw err;
        if (err instanceof DiscordApiError) {
          if (err.status === 401) throw err;
          if (err.status === 404 || err.code === ErrorCode.UNKNOWN_MESSAGE) return 'gone';
          if (err.code === ErrorCode.THREAD_ARCHIVED) return 'archived';
          if (err.code === ErrorCode.SYSTEM_MESSAGE) return 'system';
          if (err.status === 403) return 'forbidden';
        }
        if (attempt >= this.options.maxAttempts) return 'failed';
        await this.wait(this.delay.current * attempt);
      }
    }
  }

  private record(c: Candidate, where: string, guildId: string | null, status: MessageRecord['status']) {
    const rec: MessageRecord = {
      id: c.id,
      channelId: c.channelId,
      guildId: guildId && guildId !== '@me' ? guildId : null,
      where,
      author: c.author,
      content: c.content,
      timestamp: c.timestamp,
      attachments: c.attachments,
      status,
    };
    this.lastRecord = rec;
    this.events.onMessage?.(rec);
  }

  // ---- plumbing -------------------------------------------------------------

  private get signal() {
    return this.controller?.signal;
  }

  private async checkpoint() {
    const signal = this.signal;
    if (signal?.aborted) throw new AbortedError();
    while (this.pauseGate) {
      await this.pauseGate;
      if (signal?.aborted) throw new AbortedError();
    }
  }

  private wait(ms: number) {
    return this.sleep(ms, this.signal);
  }

  private tick() {
    const now = this.now();
    this.recent.push(now);
    while (this.recent.length > 2 && now - this.recent[0] > 90_000) this.recent.shift();
    if (this.recent.length > 200) this.recent.shift();
    this.emit();
  }

  private computeStats() {
    const s = this.stats;
    s.processed = s.deleted + s.failed + s.skipped + s.matched;
    s.elapsedMs = this.activeAccum + (this.status === 'running' ? this.now() - this.activeSince : 0);
    s.delay = this.delay.current;
    const r = this.recent;
    const span = r.length >= 2 ? r[r.length - 1] - r[0] : 0;
    s.speedPerMin = span > 0 ? Math.round(((r.length - 1) / span) * 60_000) : 0;
    const known = this.jobs.filter(j => j.total !== null);
    s.total = known.length ? known.reduce((sum, j) => sum + (j.total ?? 0), 0) : null;
    const remaining = s.total !== null ? Math.max(0, s.total - s.processed) : null;
    s.etaMs = remaining !== null && s.speedPerMin > 0 ? (remaining / s.speedPerMin) * 60_000 : null;
  }

  private emit() {
    this.computeStats();
    this.events.onUpdate?.();
  }

  private log(level: LogLevel, key: string, params?: Record<string, string | number>) {
    this.events.onLog?.(level, key, params);
  }
}
