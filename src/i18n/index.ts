import { signal } from '@preact/signals';
import { en } from './en';
import { fr, type I18nKey } from './fr';

export type Lang = 'fr' | 'en';
export type { I18nKey };

const dictionaries: Record<Lang, Record<I18nKey, string>> = { fr, en };

/** Reading this inside a component subscribes it, so switching language re-renders everything. */
export const currentLang = signal<Lang>('fr');

export type Params = Record<string, string | number>;

export function t(key: I18nKey | string, params?: Params): string {
  const dict = dictionaries[currentLang.value];
  let text: string = (dict as Record<string, string>)[key] ?? (fr as Record<string, string>)[key] ?? key;
  if (params) {
    text = text.replace(/\{(\w+)\}/g, (m, k) => (params[k] !== undefined ? String(params[k]) : m));
  }
  return text;
}

export const fmt = (n: number) => n.toLocaleString(currentLang.value);

export function detectLang(): Lang {
  // Discord sets <html lang> to the account locale; fall back to the browser's.
  const lang = document.documentElement.lang || navigator.language || 'en';
  return lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}
