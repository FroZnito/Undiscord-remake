/** Everything that touches Discord's own DOM lives here, so breakage is easy to fix. */

export interface DiscordLocation {
  guildId: string | null;
  channelId: string | null;
}

export function readLocation(): DiscordLocation {
  const m = /\/channels\/(@me|\d+)(?:\/(\d+))?/.exec(location.pathname);
  return m ? { guildId: m[1], channelId: m[2] ?? null } : { guildId: null, channelId: null };
}

/** Discord is a SPA: poll the path instead of patching history. Cheap and robust. */
export function watchLocation(cb: (loc: DiscordLocation) => void): () => void {
  let last = '';
  const tick = () => {
    if (location.pathname !== last) {
      last = location.pathname;
      cb(readLocation());
    }
  };
  tick();
  const timer = setInterval(tick, 700);
  return () => clearInterval(timer);
}

export const discordPrefersLight = () => document.documentElement.classList.contains('theme-light');

/** Watches Discord's theme class so our window can follow it. */
export function watchDiscordTheme(cb: (light: boolean) => void): () => void {
  const obs = new MutationObserver(() => cb(discordPrefersLight()));
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  cb(discordPrefersLight());
  return () => obs.disconnect();
}

// ---- toolbar button -----------------------------------------------------------

/**
 * Discord's class names are hashed and change often (`toolbar__9293f`,
 * `toolbar-3_r2xA`...). Try the specific forms first, then the generic ones,
 * and only accept a toolbar sitting in the header area.
 */
const TOOLBAR_SELECTORS = [
  'section[class*="title_"] [class^="toolbar_"]',
  'section[class*="title_"] [class*=" toolbar_"]',
  '[class^="toolbar_"]',
  '[class*=" toolbar_"]',
  '[class*="-toolbar"]',
  '[class*="toolbar-"]',
];

export function findToolbar(): HTMLElement | null {
  for (const sel of TOOLBAR_SELECTORS) {
    for (const el of document.querySelectorAll<HTMLElement>(sel)) {
      if (el.closest('#undiscord-remake')) continue;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && r.top >= 0 && r.top < 140) return el;
    }
  }
  return null;
}

/** Keeps `el` inside Discord's channel toolbar; reports whether it is mounted. */
export function keepInToolbar(el: HTMLElement, onMounted: (mounted: boolean) => void): () => void {
  let mounted: boolean | null = null;
  const check = () => {
    if (!el.isConnected || !el.parentElement?.matches(TOOLBAR_SELECTORS.join(','))) {
      const toolbar = findToolbar();
      if (toolbar) toolbar.prepend(el);
      else el.remove();
    }
    const now = el.isConnected;
    if (now !== mounted) {
      mounted = now;
      onMounted(now);
    }
  };
  check();
  const timer = setInterval(check, 1500);
  return () => {
    clearInterval(timer);
    el.remove();
  };
}

// ---- global styles (outside our shadow root) -----------------------------------

let globalStyle: HTMLStyleElement | null = null;

export function injectGlobalStyle(css: string) {
  if (!globalStyle) {
    globalStyle = document.createElement('style');
    globalStyle.id = 'undiscord-remake-global';
    (document.head ?? document.documentElement).appendChild(globalStyle);
  }
  globalStyle.textContent = css;
}

// ---- message picker -------------------------------------------------------------

const MESSAGE_SELECTOR = 'li[id^="chat-messages-"], [id^="chat-messages-"], [id^="message-content-"]';

/** Lets the user click a message in the chat; resolves with its id (or null on Escape). */
export function pickMessage(bannerText: string, cancelText: string): Promise<string | null> {
  return new Promise(resolve => {
    const root = document.documentElement;
    root.classList.add('udr-picking');

    const banner = document.createElement('div');
    banner.className = 'udr-pick-banner';
    const label = document.createElement('span');
    label.textContent = bannerText;
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = cancelText;
    banner.append(label, cancel);
    document.body.appendChild(banner);

    const finish = (id: string | null) => {
      root.classList.remove('udr-picking');
      banner.remove();
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey, true);
      resolve(id);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (banner.contains(target)) {
        if (target === cancel) finish(null);
        return;
      }
      const el = target.closest?.(MESSAGE_SELECTOR);
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      finish(/(\d{15,21})$/.exec(el.id)?.[1] ?? null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      finish(null);
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey, true);
  });
}

// ---- event shielding --------------------------------------------------------------

/**
 * Discord listens globally for typing (to focus the composer), pasting and
 * file drops (to upload into the open channel!). Events coming from our UI
 * must never reach those handlers. Registered at document-start, so these
 * capture listeners run before any of Discord's.
 */
export function shieldEventsFrom(isOurs: (e: Event) => boolean) {
  const swallow = (e: Event) => {
    if (!isOurs(e)) return;
    e.stopImmediatePropagation();
  };
  const blockDrop = (e: Event) => {
    if (!isOurs(e)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  for (const type of ['paste', 'copy', 'cut']) window.addEventListener(type, swallow, true);
  for (const type of ['dragenter', 'dragover', 'drop']) window.addEventListener(type, blockDrop, true);
}

/** Bubble-phase guard on our host: our own handlers have already run by then. */
export function stopBubblingFrom(host: HTMLElement) {
  for (const type of ['keydown', 'keyup', 'keypress', 'beforeinput', 'input', 'contextmenu']) {
    host.addEventListener(type, e => e.stopPropagation());
  }
}

export const PICKER_CSS = `
html.udr-picking li[id^="chat-messages-"] { cursor: crosshair !important; }
html.udr-picking li[id^="chat-messages-"]:hover {
  outline: 2px solid #5865f2 !important; outline-offset: -2px; border-radius: 6px;
  background: rgba(88, 101, 242, .12) !important;
}
.udr-pick-banner {
  position: fixed; top: 14px; left: 50%; transform: translateX(-50%); z-index: 2147483646;
  display: flex; gap: 12px; align-items: center; padding: 10px 12px 10px 16px;
  background: #5865f2; color: #fff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.35);
  font: 600 14px/1.3 "gg sans", "Noto Sans", system-ui, sans-serif;
}
.udr-pick-banner button {
  all: unset; cursor: pointer; padding: 6px 12px; border-radius: 8px; background: rgba(255,255,255,.18);
}
.udr-pick-banner button:hover { background: rgba(255,255,255,.3); }
`;
