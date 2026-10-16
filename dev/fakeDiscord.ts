/**
 * In-memory imitation of the slice of Discord's REST API that Undiscord uses.
 * Shared by the unit tests and the browser playground (dev/playground.html).
 * It deliberately reproduces Discord's annoying behaviours: 429s, 202 while
 * indexing, a search index that lags behind deletions, and spurious empty pages.
 */

import type { DiscordChannel, DiscordGuild, DiscordMessage, DiscordUser } from '../src/core/types';

const EPOCH = 1420070400000n;
const snowflakeAt = (ms: number, seq: number) => (((BigInt(ms) - EPOCH) << 22n) + BigInt(seq)).toString();
const cmp = (a: string, b: string) => (BigInt(a) < BigInt(b) ? -1 : BigInt(a) > BigInt(b) ? 1 : 0);

export interface FakeOptions {
  token?: string;
  /** Every Nth DELETE answers 429. 0 = never. */
  rateLimitEvery?: number;
  retryAfter?: number;
  /** First N searches answer 202 "index not ready". */
  indexingFor?: number;
  /** Deleted messages keep showing in search for this many searches. */
  indexLag?: number;
  /** Return an empty page (with a non-zero total) every Nth search. 0 = never. */
  emptyPageEvery?: number;
  /** Artificial latency in ms. */
  latency?: number;
}

export interface FakeState {
  me: DiscordUser;
  users: DiscordUser[];
  guilds: DiscordGuild[];
  channels: DiscordChannel[];
  messages: Map<string, DiscordMessage[]>;
  deleted: Set<string>;
  staleUntil: Map<string, number>;
  searches: number;
  deletes: number;
  forbiddenChannels: Set<string>;
}

export function createFakeDiscord(opts: FakeOptions = {}) {
  const token = opts.token ?? 'fake.token.for-local-tests-only';
  const me: DiscordUser = { id: '100000000000000001', username: 'moi', global_name: 'Moi' };
  const alice: DiscordUser = { id: '100000000000000002', username: 'alice', global_name: 'Alice' };
  const bob: DiscordUser = { id: '100000000000000003', username: 'bob', global_name: 'Bob' };

  const state: FakeState = {
    me,
    users: [me, alice, bob],
    guilds: [
      { id: '200000000000000001', name: 'Le Repaire', icon: null },
      { id: '200000000000000002', name: 'Gaming FR', icon: null },
    ],
    channels: [
      { id: '300000000000000001', type: 0, name: 'général', guild_id: '200000000000000001' },
      { id: '300000000000000002', type: 0, name: 'memes', guild_id: '200000000000000001' },
      { id: '300000000000000003', type: 0, name: 'lfg', guild_id: '200000000000000002' },
      { id: '300000000000000010', type: 1, recipients: [alice] },
      { id: '300000000000000011', type: 1, recipients: [bob] },
      { id: '300000000000000012', type: 3, name: 'Projet', recipients: [alice, bob] },
    ],
    messages: new Map(),
    deleted: new Set(),
    staleUntil: new Map(),
    searches: 0,
    deletes: 0,
    forbiddenChannels: new Set(),
  };

  let seq = 0;
  const now = Date.UTC(2026, 9, 1);
  const phrases = [
    'salut tout le monde', 'quelqu\'un pour une partie ?', 'regardez ça https://example.com/video',
    'mdr', 'je reviens dans 5 min', 'gg à tous', 'bonne nuit', 'c\'est quoi le lien du serveur ?',
    'voici le fichier', 'ok ça marche', 'hello there', 'trop bien 😂',
  ];

  /** Seeds `count` messages in a channel, alternating authors. */
  function seed(channelId: string, count: number, authors: DiscordUser[] = [me, alice]) {
    const list = state.messages.get(channelId) ?? [];
    const ch = state.channels.find(c => c.id === channelId);
    for (let i = 0; i < count; i++) {
      const ts = now - (count - i) * 3_600_000 - seq * 1000;
      const author = authors[i % authors.length];
      const content = phrases[(i + seq) % phrases.length];
      const id = snowflakeAt(ts, seq++ % 4096);
      list.push({
        id,
        channel_id: channelId,
        guild_id: ch?.guild_id,
        author,
        content,
        timestamp: new Date(ts).toISOString(),
        attachments: content.includes('fichier')
          ? [{ id: `${id}1`, filename: 'notes.pdf', url: `https://cdn.example.com/${id}/notes.pdf` }] : [],
        embeds: [],
        pinned: i === 3,
        type: i === 0 && ch?.type === 3 ? 1 : 0,
      });
    }
    list.sort((a, b) => cmp(b.id, a.id));
    state.messages.set(channelId, list);
  }

  const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
    new Response(body === undefined ? null : JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json', ...headers },
    });

  const allMessages = () => [...state.messages.values()].flat();

  function visible(m: DiscordMessage) {
    if (!state.deleted.has(m.id)) return true;
    return (state.staleUntil.get(m.id) ?? 0) > state.searches;
  }

  function search(url: URL, scope: { guildId?: string; channelId?: string }) {
    state.searches++;
    if (opts.indexingFor && state.searches <= opts.indexingFor) {
      return json(202, { message: 'Index not yet available. Try again later', code: 110000, retry_after: 0.01 });
    }
    const p = url.searchParams;
    const authors = p.getAll('author_id');
    const channelIds = p.getAll('channel_id');
    const content = p.get('content')?.toLowerCase();
    const has = p.getAll('has');
    const pinned = p.get('pinned');
    const minId = p.get('min_id');
    const maxId = p.get('max_id');
    const offset = Number(p.get('offset') ?? 0);

    let list = allMessages().filter(m => {
      const ch = state.channels.find(c => c.id === m.channel_id);
      if (scope.guildId && ch?.guild_id !== scope.guildId) return false;
      if (scope.channelId && m.channel_id !== scope.channelId) return false;
      if (channelIds.length && !channelIds.includes(m.channel_id)) return false;
      if (authors.length && !authors.includes(m.author.id)) return false;
      if (content && !m.content.toLowerCase().includes(content)) return false;
      if (has.includes('link') && !/https?:\/\//.test(m.content)) return false;
      if (has.includes('file') && !m.attachments.length) return false;
      if (pinned === 'true' && !m.pinned) return false;
      if (minId && cmp(m.id, minId) <= 0) return false;
      if (maxId && cmp(m.id, maxId) >= 0) return false;
      return visible(m);
    });
    list.sort((a, b) => cmp(b.id, a.id));
    const total = list.length;
    if (opts.emptyPageEvery && state.searches % opts.emptyPageEvery === 0 && total) {
      return json(200, { total_results: total, messages: [] });
    }
    list = list.slice(offset, offset + 25);
    return json(200, { total_results: total, messages: list.map(m => [{ ...m, hit: true }]) });
  }

  async function handle(method: string, url: URL): Promise<Response> {
    const path = url.pathname.replace(/^\/api\/v\d+/, '');
    let m: RegExpExecArray | null;

    if (method === 'GET' && path === '/users/@me') return json(200, me);
    if (method === 'GET' && path === '/users/@me/guilds') return json(200, state.guilds);
    if (method === 'GET' && path === '/users/@me/channels') {
      return json(200, state.channels.filter(c => c.type === 1 || c.type === 3));
    }
    if ((m = /^\/guilds\/(\d+)\/messages\/search$/.exec(path)) && method === 'GET') {
      return search(url, { guildId: m[1] });
    }
    if ((m = /^\/channels\/(\d+)\/messages\/search$/.exec(path)) && method === 'GET') {
      return search(url, { channelId: m[1] });
    }
    if ((m = /^\/channels\/(\d+)\/messages\/pins$/.exec(path)) && method === 'GET') {
      const pins = (state.messages.get(m[1]) ?? []).filter(x => x.pinned && !state.deleted.has(x.id));
      return json(200, { items: pins.map(message => ({ pinned_at: message.timestamp, message })), has_more: false });
    }
    if ((m = /^\/channels\/(\d+)\/messages$/.exec(path)) && method === 'GET') {
      const before = url.searchParams.get('before');
      const limit = Number(url.searchParams.get('limit') ?? 50);
      const list = (state.messages.get(m[1]) ?? [])
        .filter(x => !state.deleted.has(x.id) && (!before || cmp(x.id, before) < 0))
        .slice(0, limit);
      return json(200, list);
    }
    if ((m = /^\/channels\/(\d+)\/messages\/(\d+)$/.exec(path)) && method === 'DELETE') {
      const [, channelId, messageId] = m;
      if (state.forbiddenChannels.has(channelId)) return json(403, { message: 'Missing Access', code: 50001 });
      state.deletes++;
      if (opts.rateLimitEvery && state.deletes % opts.rateLimitEvery === 0) {
        return json(429, { message: 'You are being rate limited.', retry_after: opts.retryAfter ?? 0.05, global: false });
      }
      const msg = state.messages.get(channelId)?.find(x => x.id === messageId);
      if (!msg || state.deleted.has(messageId)) return json(404, { message: 'Unknown Message', code: 10008 });
      if (msg.type === 1) return json(400, { message: 'Cannot execute action on a system message', code: 50021 });
      state.deleted.add(messageId);
      state.staleUntil.set(messageId, state.searches + (opts.indexLag ?? 0));
      return new Response(null, { status: 204 });
    }
    if ((m = /^\/channels\/(\d+)$/.exec(path)) && method === 'GET') {
      if (state.forbiddenChannels.has(m[1])) return json(403, { message: 'Missing Access', code: 50001 });
      const ch = state.channels.find(c => c.id === m![1]);
      return ch ? json(200, ch) : json(404, { message: 'Unknown Channel', code: 10003 });
    }
    return json(404, { message: `404: Not Found (${method} ${path})`, code: 0 });
  }

  const fetchImpl = async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
    const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);
    const headers = new Headers(init.headers);
    if (opts.latency) await new Promise(r => setTimeout(r, opts.latency));
    if (init.signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    if (headers.get('authorization') !== token) return json(401, { message: '401: Unauthorized', code: 0 });
    return handle((init.method ?? 'GET').toUpperCase(), url);
  };

  const remaining = (channelId: string, authorId = me.id) =>
    (state.messages.get(channelId) ?? []).filter(m => !state.deleted.has(m.id) && m.author.id === authorId).length;

  return { fetch: fetchImpl, state, seed, token, remaining, me };
}
