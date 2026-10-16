/**
 * Finding the user's auth token, most reliable method first:
 *  1. read the Authorization header of Discord's own API calls (hooked at document-start),
 *  2. ask Discord's webpack token store,
 *  3. read the copy Discord keeps in localStorage.
 * The token stays in memory and is only ever sent to discord.com.
 */

import { readStorageRaw } from './storage';

const TOKEN_RE = /^(mfa\.[\w-]{20,}|[\w-]{20,}\.[\w-]{4,}\.[\w-]{20,})$/;
export const looksLikeToken = (v: unknown): v is string => typeof v === 'string' && TOKEN_RE.test(v.trim());

export type TokenSource = 'network' | 'webpack' | 'storage' | 'manual';

let captured: string | null = null;
const listeners = new Set<(token: string) => void>();

/** The page's fetch before anyone (including us) wrapped it. */
export let nativeFetch: typeof fetch = (input, init) => window.fetch(input, init);

const isApiUrl = (url: string) => /\/api\/v\d+\//.test(url);

function capture(token: string) {
  if (token === captured) return;
  captured = token;
  for (const l of listeners) l(token);
}

export function onTokenCaptured(cb: (token: string) => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export const getCapturedToken = () => captured;

function authFromHeaders(h: HeadersInit | undefined): string | null {
  if (!h) return null;
  if (h instanceof Headers) return h.get('authorization');
  if (Array.isArray(h)) return h.find(([k]) => k.toLowerCase() === 'authorization')?.[1] ?? null;
  for (const [k, v] of Object.entries(h)) if (k.toLowerCase() === 'authorization') return v;
  return null;
}

type TrackedXhr = XMLHttpRequest & { __udrUrl?: string };

export function installTokenCapture(win: Window & typeof globalThis = window) {
  const flag = win as unknown as { __undiscordRemakeHooked?: boolean };
  if (flag.__undiscordRemakeHooked) return;
  flag.__undiscordRemakeHooked = true;

  const proto = win.XMLHttpRequest.prototype;
  const open = proto.open;
  const setHeader = proto.setRequestHeader;
  proto.open = function (this: TrackedXhr, ...args: unknown[]) {
    this.__udrUrl = String(args[1]);
    return (open as (...a: unknown[]) => void).apply(this, args);
  };
  proto.setRequestHeader = function (this: TrackedXhr, name: string, value: string) {
    try {
      if (name.toLowerCase() === 'authorization' && isApiUrl(this.__udrUrl ?? '') && looksLikeToken(value)) capture(value);
    } catch { /* never break Discord */ }
    return setHeader.call(this, name, value);
  };

  const originalFetch = win.fetch;
  nativeFetch = (input, init) => originalFetch.call(win, input, init);
  win.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    try {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      if (isApiUrl(url)) {
        const auth = authFromHeaders(init?.headers) ?? (input instanceof Request ? input.headers.get('authorization') : null);
        if (looksLikeToken(auth)) capture(auth);
      }
    } catch { /* never break Discord */ }
    return originalFetch.call(win, input, init);
  };
}

export function findTokenViaWebpack(): string | null {
  const chunk = (window as unknown as { webpackChunkdiscord_app?: unknown[] }).webpackChunkdiscord_app;
  if (!Array.isArray(chunk)) return null;
  let req: { c?: Record<string, { exports?: any }> } | undefined;
  try {
    chunk.push([[Symbol('undiscord-remake')], {}, (r: typeof req) => { req = r; }]);
    chunk.pop();
  } catch {
    return null;
  }
  for (const mod of Object.values(req?.c ?? {})) {
    const exp = mod?.exports;
    if (!exp || (typeof exp !== 'object' && typeof exp !== 'function')) continue;
    const candidates: unknown[] = [exp];
    try {
      for (const key of Object.keys(exp).slice(0, 40)) candidates.push(exp[key]);
    } catch { /* exotic export objects */ }
    for (const c of candidates) {
      try {
        const getToken = (c as { getToken?: () => unknown })?.getToken;
        if (typeof getToken === 'function') {
          const t = getToken.call(c);
          if (looksLikeToken(t)) return t;
        }
      } catch { /* keep looking */ }
    }
  }
  return null;
}

export function findTokenViaStorage(): string | null {
  try {
    const raw = readStorageRaw('token');
    if (!raw) return null;
    const t = JSON.parse(raw);
    return looksLikeToken(t) ? t : null;
  } catch {
    return null;
  }
}

export function resolveToken(manual?: string): { token: string; source: TokenSource } | null {
  if (manual && looksLikeToken(manual)) return { token: manual.trim(), source: 'manual' };
  if (captured) return { token: captured, source: 'network' };
  const fromWebpack = findTokenViaWebpack();
  if (fromWebpack) return { token: fromWebpack, source: 'webpack' };
  const fromStorage = findTokenViaStorage();
  if (fromStorage) return { token: fromStorage, source: 'storage' };
  return null;
}
