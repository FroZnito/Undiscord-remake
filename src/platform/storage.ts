/**
 * Discord deletes `window.localStorage` once its app boots, so we grab a
 * reference at document-start (falling back to a hidden iframe's storage,
 * then to memory).
 */

const PREFIX = 'undiscord-remake:';
let store: Storage | null = null;
const memory = new Map<string, string>();

export function initStorage() {
  if (store) return;
  try {
    store = window.localStorage;
    store.getItem(`${PREFIX}probe`);
    return;
  } catch {
    store = null;
  }
  try {
    const frame = document.createElement('iframe');
    frame.style.display = 'none';
    frame.setAttribute('aria-hidden', 'true');
    (document.body ?? document.documentElement).appendChild(frame);
    store = frame.contentWindow?.localStorage ?? null;
  } catch {
    store = null;
  }
}

/** Raw read without our prefix (used to look at Discord's own keys). */
export function readStorageRaw(key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = store ? store.getItem(PREFIX + key) : memory.get(key) ?? null;
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    // Merge objects so new settings get their defaults after an update.
    if (fallback && typeof fallback === 'object' && !Array.isArray(fallback) && parsed && typeof parsed === 'object') {
      return { ...fallback, ...parsed };
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    const raw = JSON.stringify(value);
    if (store) store.setItem(PREFIX + key, raw);
    else memory.set(key, raw);
  } catch {
    /* quota exceeded or storage gone: settings just won't persist */
  }
}

export function remove(key: string) {
  try {
    if (store) store.removeItem(PREFIX + key);
    else memory.delete(key);
  } catch { /* ignore */ }
}
