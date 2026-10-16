declare const __VERSION__: string;

export const VERSION = typeof __VERSION__ === 'string' ? __VERSION__ : 'dev';
export const APP_NAME = 'Undiscord Remake';
export const AUTHOR = 'FroZn';
export const BRAND = `${APP_NAME} by ${AUTHOR}`;
export const REPO_URL = 'https://github.com/FroZnito/Undiscord-remake';
export const SHORTCUT_LABEL = 'Alt + Shift + U';

export const isShortcut = (e: KeyboardEvent) => e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey && e.code === 'KeyU';
