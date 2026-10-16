import type {
  DiscordChannel, DiscordGuild, DiscordMessage, DiscordUser, SearchResponse,
} from './types';
import { sleep as defaultSleep, isAbortError, throwIfAborted, type Sleeper } from './util';

export const API_BASE = 'https://discord.com/api/v9';

export const ErrorCode = {
  UNKNOWN_CHANNEL: 10003,
  UNKNOWN_MESSAGE: 10008,
  MISSING_ACCESS: 50001,
  MISSING_PERMISSIONS: 50013,
  SYSTEM_MESSAGE: 50021,
  THREAD_ARCHIVED: 50083,
} as const;

export class DiscordApiError extends Error {
  constructor(
    public status: number,
    public code: number | undefined,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'DiscordApiError';
  }
}

export interface RateLimitInfo {
  waitMs: number;
  global: boolean;
  route: string;
}

export interface ApiHooks {
  onRateLimit?(info: RateLimitInfo): void;
  onIndexing?(waitMs: number): void;
  onRetry?(reason: string, attempt: number, waitMs: number): void;
}

export interface ApiConfig {
  getToken: () => string | null;
  baseUrl?: string;
  fetch?: typeof fetch;
  sleep?: Sleeper;
  now?: () => number;
  hooks?: ApiHooks;
}

type Query = [string, string][] | Record<string, string | number | boolean | undefined>;

interface RequestOptions {
  query?: Query;
  body?: unknown;
  signal?: AbortSignal;
  maxRetries?: number;
}

/**
 * Discord buckets rate limits per route, keyed on the "major" parameter
 * (first id in the path). Other ids are collapsed.
 */
export function routeKey(method: string, path: string): string {
  let seen = false;
  return `${method} ${path.replace(/\d{15,}/g, id => {
    if (seen) return ':id';
    seen = true;
    return id;
  })}`;
}

async function readJson(resp: Response): Promise<any> {
  const text = await resp.text().catch(() => '');
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text.slice(0, 200) };
  }
}

export class DiscordApi {
  readonly stats = { requests: 0, rateLimits: 0, rateLimitedMs: 0, lastPing: 0, avgPing: 0 };
  private bucketUntil = new Map<string, number>();
  private globalUntil = 0;
  private readonly fetchImpl: typeof fetch;
  private readonly sleep: Sleeper;
  private readonly now: () => number;

  constructor(private cfg: ApiConfig) {
    // Bind to window: calling a detached native fetch throws "Illegal invocation".
    this.fetchImpl = cfg.fetch ?? ((input, init) => window.fetch(input, init));
    this.sleep = cfg.sleep ?? defaultSleep;
    this.now = cfg.now ?? Date.now;
  }

  set hooks(h: ApiHooks | undefined) {
    this.cfg.hooks = h;
  }

  private buildUrl(path: string, query?: Query): string {
    const params = new URLSearchParams();
    if (Array.isArray(query)) for (const [k, v] of query) params.append(k, v);
    else if (query) for (const [k, v] of Object.entries(query)) if (v !== undefined) params.append(k, String(v));
    const qs = params.toString();
    return `${this.cfg.baseUrl ?? API_BASE}${path}${qs ? `?${qs}` : ''}`;
  }

  private async waitForBucket(route: string, signal?: AbortSignal) {
    const until = Math.max(this.globalUntil, this.bucketUntil.get(route) ?? 0);
    const wait = until - this.now();
    if (wait > 0) await this.sleep(wait, signal);
  }

  private trackBucket(route: string, headers: Headers) {
    const remaining = headers.get('x-ratelimit-remaining');
    const resetAfter = Number(headers.get('x-ratelimit-reset-after'));
    if (remaining === '0' && resetAfter > 0) {
      this.bucketUntil.set(route, this.now() + resetAfter * 1000 + 50);
    }
  }

  private recordPing(ms: number) {
    this.stats.lastPing = ms;
    this.stats.avgPing = this.stats.avgPing ? Math.round(this.stats.avgPing * 0.85 + ms * 0.15) : ms;
  }

  async request<T>(method: string, path: string, opts: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(path, opts.query);
    const route = routeKey(method, path);
    const maxRetries = opts.maxRetries ?? 4;
    const hooks = () => this.cfg.hooks;
    let failures = 0;
    let rateLimits = 0;
    let indexing = 0;

    for (;;) {
      throwIfAborted(opts.signal);
      await this.waitForBucket(route, opts.signal);
      const token = this.cfg.getToken();
      if (!token) throw new DiscordApiError(401, undefined, 'NO_TOKEN');

      const headers: Record<string, string> = { Authorization: token };
      if (opts.body !== undefined) headers['Content-Type'] = 'application/json';

      const started = this.now();
      let resp: Response;
      try {
        resp = await this.fetchImpl(url, {
          method,
          headers,
          body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
          signal: opts.signal,
        });
      } catch (err) {
        if (isAbortError(err) || opts.signal?.aborted) throw err;
        if (++failures > maxRetries) {
          throw new DiscordApiError(0, undefined, `Network error: ${(err as Error).message}`);
        }
        const wait = 1000 * 2 ** failures;
        hooks()?.onRetry?.('network', failures, wait);
        await this.sleep(wait, opts.signal);
        continue;
      }
      this.stats.requests++;
      this.recordPing(this.now() - started);
      this.trackBucket(route, resp.headers);

      if (resp.status === 429) {
        const body = await readJson(resp);
        const retryAfter = Number(body?.retry_after ?? resp.headers.get('retry-after') ?? 1) || 1;
        const waitMs = Math.ceil(retryAfter * 1000) + 250;
        const global = !!body?.global;
        if (global) this.globalUntil = this.now() + waitMs;
        else this.bucketUntil.set(route, this.now() + waitMs);
        this.stats.rateLimits++;
        this.stats.rateLimitedMs += waitMs;
        hooks()?.onRateLimit?.({ waitMs, global, route });
        if (++rateLimits > 25) throw new DiscordApiError(429, undefined, 'Rate limited too many times in a row');
        continue; // waitForBucket handles the pause (and stays abortable)
      }

      if (resp.status === 202) {
        // Search index is still being built for this channel/guild.
        const body = await readJson(resp);
        const waitMs = Math.max(1500, Math.ceil(Number(body?.retry_after ?? 2) * 1000));
        if (++indexing > 40) throw new DiscordApiError(202, body?.code, 'Search index not available');
        hooks()?.onIndexing?.(waitMs);
        await this.sleep(waitMs, opts.signal);
        continue;
      }

      if (resp.status >= 500) {
        if (++failures > maxRetries) throw new DiscordApiError(resp.status, undefined, `Server error ${resp.status}`);
        const wait = 1000 * 2 ** failures;
        hooks()?.onRetry?.(`HTTP ${resp.status}`, failures, wait);
        await this.sleep(wait, opts.signal);
        continue;
      }

      if (resp.status === 204) return undefined as T;
      const body = await readJson(resp);
      if (!resp.ok) {
        throw new DiscordApiError(resp.status, body?.code, body?.message ?? `HTTP ${resp.status}`, body);
      }
      return body as T;
    }
  }

  // ---- endpoints ---------------------------------------------------------

  me(signal?: AbortSignal) {
    return this.request<DiscordUser>('GET', '/users/@me', { signal });
  }

  guilds(signal?: AbortSignal) {
    return this.request<DiscordGuild[]>('GET', '/users/@me/guilds', { signal, query: { with_counts: false } });
  }

  guildChannels(guildId: string, signal?: AbortSignal) {
    return this.request<DiscordChannel[]>('GET', `/guilds/${guildId}/channels`, { signal });
  }

  dmChannels(signal?: AbortSignal) {
    return this.request<DiscordChannel[]>('GET', '/users/@me/channels', { signal });
  }

  channel(id: string, signal?: AbortSignal) {
    return this.request<DiscordChannel>('GET', `/channels/${id}`, { signal, maxRetries: 1 });
  }

  /** Guild-wide search when `guildId` is a real guild, otherwise a single (DM) channel search. */
  search(scope: { guildId?: string | null; channelId?: string }, query: [string, string][], signal?: AbortSignal) {
    const path = scope.guildId && scope.guildId !== '@me'
      ? `/guilds/${scope.guildId}/messages/search`
      : `/channels/${scope.channelId}/messages/search`;
    return this.request<SearchResponse>('GET', path, { query, signal });
  }

  messages(channelId: string, opts: { before?: string; limit?: number }, signal?: AbortSignal) {
    return this.request<DiscordMessage[]>('GET', `/channels/${channelId}/messages`, {
      signal,
      query: { before: opts.before, limit: opts.limit ?? 100 },
    });
  }

  deleteMessage(channelId: string, messageId: string, signal?: AbortSignal) {
    return this.request<void>('DELETE', `/channels/${channelId}/messages/${messageId}`, { signal, maxRetries: 2 });
  }

  /** Ids of pinned messages. Uses the paginated endpoint, falling back to the legacy one. */
  async pinnedIds(channelId: string, signal?: AbortSignal): Promise<Set<string>> {
    const ids = new Set<string>();
    try {
      let before: string | undefined;
      for (let page = 0; page < 40; page++) {
        const res = await this.request<{ items: { pinned_at: string; message: DiscordMessage }[]; has_more: boolean }>(
          'GET', `/channels/${channelId}/messages/pins`, { signal, query: { limit: 50, before } },
        );
        for (const item of res.items ?? []) ids.add(item.message.id);
        if (!res.has_more || !res.items?.length) break;
        before = res.items[res.items.length - 1].pinned_at;
      }
      return ids;
    } catch (err) {
      if (isAbortError(err)) throw err;
      const legacy = await this.request<DiscordMessage[]>('GET', `/channels/${channelId}/pins`, { signal });
      for (const m of legacy ?? []) ids.add(m.id);
      return ids;
    }
  }
}
