import { effect } from '@preact/signals';
import { render } from 'preact';
import { t } from './i18n';
import {
  injectGlobalStyle, keepInToolbar, PICKER_CSS, shieldEventsFrom, stopBubblingFrom, watchDiscordTheme,
} from './platform/discordDom';
import { initStorage } from './platform/storage';
import { installTokenCapture } from './platform/token';
import { App, toggleWindow } from './ui/App';
import { APP_NAME, AUTHOR, BRAND, isShortcut, REPO_URL, SHORTCUT_LABEL, VERSION } from './ui/constants';
import { initDiscord, log } from './ui/controller';
import * as S from './ui/state';
import css from './ui/styles.css';

// ---- toolbar button (lives in Discord's DOM, outside our shadow root) ------------------

const TRASH_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/>
  <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;

const TOOLBAR_CSS = `
#udr-toolbar-btn {
  position: relative; display: flex; align-items: center; justify-content: center; flex: 0 0 auto;
  width: 24px; height: 24px; margin: 0 8px; cursor: pointer; border-radius: 4px;
  color: var(--interactive-normal, var(--icon-secondary, #b5bac1));
}
#udr-toolbar-btn:hover { color: var(--interactive-hover, var(--icon-primary, #dbdee1)); }
#udr-toolbar-btn.open { color: var(--interactive-active, #fff); }
#udr-toolbar-btn:focus-visible { outline: 2px solid #5865f2; }
#udr-toolbar-btn .udr-dot {
  position: absolute; right: -3px; bottom: -3px; width: 9px; height: 9px; border-radius: 50%;
  background: #f23f43; box-shadow: 0 0 0 2px var(--background-primary, var(--bg-base-primary, #313338));
  animation: udr-pulse 1.4s ease-in-out infinite;
}
#udr-toolbar-btn.paused .udr-dot { background: #f0b232; animation: none; }
@keyframes udr-pulse { 50% { opacity: .35; } }
`;

function mountToolbarButton() {
  const btn = document.createElement('div');
  btn.id = 'udr-toolbar-btn';
  btn.setAttribute('role', 'button');
  btn.tabIndex = 0;
  btn.innerHTML = TRASH_SVG;
  const dot = document.createElement('span');
  dot.className = 'udr-dot';
  btn.addEventListener('click', toggleWindow);
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleWindow();
    }
  });

  effect(() => {
    const status = S.run.status.value;
    const active = status === 'running' || status === 'paused';
    btn.classList.toggle('open', S.ui.open.value);
    btn.classList.toggle('paused', status === 'paused');
    if (active) btn.appendChild(dot);
    else dot.remove();
    const label = `${BRAND} — ${t(`status.${status}`)} (${SHORTCUT_LABEL})`;
    btn.title = label;
    btn.setAttribute('aria-label', label);
  });

  keepInToolbar(btn, mounted => (S.ui.toolbarMounted.value = mounted));
}

// ---- boot ---------------------------------------------------------------------------------

function boot(setHost: (el: HTMLElement) => void) {
  S.initState();

  const host = document.createElement('div');
  host.id = 'undiscord-remake';
  setHost(host);
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = css;
  const mount = document.createElement('div');
  shadow.append(style, mount);
  document.body.appendChild(host);
  stopBubblingFrom(host);
  render(<App />, mount);

  // Discord occasionally re-renders <body> children; make sure we stay attached.
  setInterval(() => {
    if (!host.isConnected) document.body.appendChild(host);
  }, 2000);

  injectGlobalStyle(PICKER_CSS + TOOLBAR_CSS);
  mountToolbarButton();
  watchDiscordTheme(light => (S.ui.discordLight.value = light));

  window.addEventListener('keydown', e => {
    if (!isShortcut(e)) return;
    e.preventDefault();
    e.stopPropagation();
    toggleWindow();
  }, true);

  initDiscord();
  log('info', 'log.ready', { brand: BRAND, version: VERSION, shortcut: SHORTCUT_LABEL });
  console.info(
    `%c ${APP_NAME} %c by ${AUTHOR} %c v${VERSION} · ${REPO_URL}`,
    'background:#5865f2;color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px',
    'background:#2b2d31;color:#fff;border-radius:0 4px 4px 0;padding:2px 4px',
    'color:#80848e',
  );
}

const flag = window as unknown as { __undiscordRemake?: boolean };

if (!flag.__undiscordRemake) {
  flag.__undiscordRemake = true;
  // Runs at document-start, before Discord's scripts: grab storage and hook requests first.
  initStorage();
  installTokenCapture();

  let host: HTMLElement | null = null;
  shieldEventsFrom(e => !!host && e.composedPath().includes(host));

  const start = () => boot(el => (host = el));
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
}
