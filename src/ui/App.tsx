import { useEffect, useRef, useState } from 'preact/hooks';
import { formatDuration } from '../core/util';
import { fmt, t } from '../i18n';
import {
  buildTargets, deletePreviewSelection, dismissToast, packageMatcher, pause, resume, startPackageWipe, startWipe, stop,
  TYPE_TO_CONFIRM_ABOVE,
} from './controller';
import { avatarUrl, userName } from './format';
import * as S from './state';
import { APP_NAME, AUTHOR, BRAND, SHORTCUT_LABEL } from './constants';
import { Icon, type IconName } from './components/Icon';
import { Avatar, Button, Progress } from './components/primitives';
import { ArchivePage } from './pages/ArchivePage';
import { LogsPage } from './pages/LogsPage';
import { PackagePage } from './pages/PackagePage';
import { SettingsPage } from './pages/SettingsPage';
import { percentDone, StatusPill, WipePage } from './pages/WipePage';

export function App() {
  const s = S.settings.value;
  const rect = S.ui.rect.value;
  const classes = ['root', rect.w < 680 && 'compact', rect.w < 600 && 'narrow', s.privacy && 'privacy'].filter(Boolean).join(' ');
  return (
    <div class={classes} data-theme={S.isLight.value ? 'light' : 'dark'}>
      {S.ui.open.value && <Window />}
      <Fab />
      <Toasts />
    </div>
  );
}

export const toggleWindow = () => (S.ui.open.value = !S.ui.open.value);

// ---- window shell ------------------------------------------------------------------

const NAV: { tab: S.Tab; icon: IconName; label: string }[] = [
  { tab: 'wipe', icon: 'trash', label: 'nav.wipe' },
  { tab: 'package', icon: 'package', label: 'nav.package' },
  { tab: 'archive', icon: 'archive', label: 'nav.archive' },
  { tab: 'logs', icon: 'log', label: 'nav.logs' },
  { tab: 'settings', icon: 'sliders', label: 'nav.settings' },
];

function startPointerDrag(e: PointerEvent, onMove: (dx: number, dy: number) => void) {
  const el = e.currentTarget as HTMLElement;
  const x0 = e.clientX;
  const y0 = e.clientY;
  el.setPointerCapture(e.pointerId);
  const move = (ev: PointerEvent) => onMove(ev.clientX - x0, ev.clientY - y0);
  const end = () => {
    el.removeEventListener('pointermove', move);
    el.removeEventListener('pointerup', end);
    el.removeEventListener('pointercancel', end);
    S.saveRect();
  };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
}

function Window() {
  const rect = S.ui.rect.value;
  const tab = S.ui.tab.value;

  useEffect(() => {
    const onResize = () => (S.ui.rect.value = S.clampRect(S.ui.rect.value));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onHeaderDown = (e: PointerEvent) => {
    if (e.button !== 0 || (e.target as Element).closest('button')) return;
    const start = S.ui.rect.value;
    startPointerDrag(e, (dx, dy) => (S.ui.rect.value = S.clampRect({ ...start, x: start.x + dx, y: start.y + dy })));
  };
  const onResizeDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    const start = S.ui.rect.value;
    startPointerDrag(e, (dx, dy) => (S.ui.rect.value = S.clampRect({ ...start, w: start.w + dx, h: start.h + dy })));
  };

  return (
    <div class="win" style={{ left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.w}px`, height: `${rect.h}px` }} role="dialog" aria-label={BRAND}>
      <header class="win-header" onPointerDown={onHeaderDown}>
        <div class="logo"><Icon name="trash" size="sm" /></div>
        <div class="win-title">
          <b>{APP_NAME}</b>
          <span>by {AUTHOR} · {t('app.tagline')}</span>
        </div>
        <StatusPill />
        <div class="spacer" />
        <kbd title={t('settings.shortcutDesc')} class="muted" style={{ fontSize: '11px' }}>{SHORTCUT_LABEL}</kbd>
        <Button small variant="ghost" icon="x" title={t('action.close')} aria-label={t('action.close')} onClick={() => (S.ui.open.value = false)} />
      </header>

      <div class="win-body">
        <nav class="nav" aria-label={APP_NAME}>
          {NAV.map(n => (
            <button type="button" class={`nav-item${tab === n.tab ? ' active' : ''}`} onClick={() => (S.ui.tab.value = n.tab)} title={t(n.label)} aria-current={tab === n.tab ? 'page' : undefined}>
              <Icon name={n.icon} />
              <span class="nav-label">{t(n.label)}</span>
              <NavCount tab={n.tab} />
            </button>
          ))}
          <AccountChip />
        </nav>
        <main class="content scroll" key={tab}>
          {tab === 'wipe' && <WipePage />}
          {tab === 'package' && <PackagePage />}
          {tab === 'archive' && <ArchivePage />}
          {tab === 'logs' && <LogsPage />}
          {tab === 'settings' && <SettingsPage />}
        </main>
      </div>

      <Footer />
      <div class="resize" onPointerDown={onResizeDown} aria-hidden="true" />
      <ConfirmDialog />
    </div>
  );
}

function NavCount({ tab }: { tab: S.Tab }) {
  if (tab === 'archive') {
    S.archive.version.value;
    const n = S.archive.items.length;
    return n ? <span class="count">{n > 999 ? `${Math.floor(n / 1000)}k` : n}</span> : null;
  }
  if (tab === 'logs') {
    S.logs.version.value;
    const errors = S.logs.items.filter(e => e.level === 'error').length;
    return errors ? <span class="count" style={{ background: 'var(--danger-soft)', color: 'var(--danger-text)' }}>{errors}</span> : null;
  }
  return null;
}

function AccountChip() {
  const me = S.discord.me.value;
  const state = S.discord.tokenState.value;
  const color = state === 'ok' ? 'var(--success)' : state === 'invalid' ? 'var(--danger)' : 'var(--warn)';
  return (
    <div class="account" onClick={() => (S.ui.tab.value = 'settings')} title={me ? t('account.as', { name: userName(me) }) : t(`account.${state === 'ok' ? 'detecting' : state}`)}>
      <Avatar url={avatarUrl(me)} name={userName(me)} size="sm" icon={me ? undefined : 'user'} />
      <div class="who">
        <b class="priv">{me ? userName(me) : '—'}</b>
        <span><span class="dot" style={{ display: 'inline-block', color, marginRight: '5px', width: '7px', height: '7px' }} />
          {state === 'ok' ? 'Discord' : t(`account.${state}`)}</span>
      </div>
    </div>
  );
}

// ---- footer ------------------------------------------------------------------------

function Footer() {
  const status = S.run.status.value;
  const active = status === 'running' || status === 'paused' || status === 'stopping';
  const tab = S.ui.tab.value;
  const view = S.ui.wipeView.value;
  let content = null;
  if (active) content = <RunBar />;
  else if (tab === 'wipe' && view === 'form') content = <WipeActions />;
  else if (tab === 'wipe' && view === 'results') content = <ResultsActions />;
  else if (tab === 'package' && S.pkg.data.value) content = <PackageActions />;
  if (!content) return null;
  return <footer class="win-footer">{content}</footer>;
}

function RunBar() {
  const status = S.run.status.value;
  const stats = S.run.stats.value;
  const pct = percentDone(stats);
  const preview = S.run.kind.value === 'preview';
  return (
    <div class="runbar">
      <Progress value={pct} tone={preview ? undefined : 'danger'} paused={status === 'paused'} />
      <span class="txt">
        {fmt(preview ? stats.matched : stats.deleted)}
        {stats.total !== null && ` / ${fmt(stats.total)}`}
        {stats.etaMs !== null && ` · ~${formatDuration(stats.etaMs)}`}
      </span>
      {status === 'paused'
        ? <Button small variant="primary" icon="play" onClick={resume}>{t('action.resume')}</Button>
        : <Button small icon="pause" onClick={pause} disabled={status !== 'running'}>{t('action.pause')}</Button>}
      <Button small variant="danger" icon="stop" onClick={stop} disabled={status === 'stopping'}>{t('action.stop')}</Button>
      {(S.ui.tab.value !== 'wipe' || S.ui.wipeView.value === 'form') && (
        <Button small variant="ghost" title={t('action.details')} icon="chevronLeft" onClick={() => {
          S.ui.tab.value = 'wipe';
          S.ui.wipeView.value = preview ? 'results' : 'run';
        }} />
      )}
    </div>
  );
}

function WipeActions() {
  S.discord.channelInfo.value;
  S.discord.dms.value;
  S.discord.guilds.value;
  const targets = buildTargets();
  const ready = S.discord.tokenState.value === 'ok';
  const summary = targets.length === 0
    ? t('toast.noTarget')
    : targets.length === 1 ? targets[0].label : `${targets.length} ${t('run.jobs').toLowerCase()}`;
  return (
    <>
      <Icon name={targets.length ? 'checkCircle' : 'info'} class="muted" />
      <span class="summary grow priv">{summary}</span>
      <Button icon="eye" disabled={!ready || !targets.length} onClick={() => void startWipe('preview')}>{t('action.preview')}</Button>
      <Button variant="danger" icon="trash" disabled={!ready || !targets.length} onClick={() => void startWipe('delete')}>{t('action.delete')}</Button>
    </>
  );
}

function ResultsActions() {
  S.preview.results.version.value;
  const excluded = S.preview.excluded.value;
  const n = S.preview.results.items.length - S.preview.results.items.filter(r => excluded.has(r.id)).length;
  return (
    <>
      <Button variant="ghost" icon="chevronLeft" onClick={() => (S.ui.wipeView.value = 'form')}>{t('action.back')}</Button>
      <div class="spacer" />
      <Button variant="danger" icon="trash" disabled={!n || S.discord.tokenState.value !== 'ok'} onClick={() => void deletePreviewSelection()}>
        {t('action.deleteSelection', { n: fmt(n) })}
      </Button>
    </>
  );
}

function PackageActions() {
  const data = S.pkg.data.value!;
  const selected = S.pkg.selected.value;
  S.filter.value;
  S.discord.me.value;
  const matcher = packageMatcher();
  const n = matcher ? data.channels.reduce((sum, ch) => sum + (selected.has(ch.id) ? matcher(ch).length : 0), 0) : 0;
  const ready = S.discord.tokenState.value === 'ok';
  return (
    <>
      <Icon name="package" class="muted" />
      <span class="summary grow">{t('target.selected', { n: selected.size })}</span>
      <Button icon="eye" disabled={!ready || !selected.size} onClick={() => void startPackageWipe('preview')}>{t('action.preview')}</Button>
      <Button variant="danger" icon="trash" disabled={!ready || !selected.size} onClick={() => void startPackageWipe('delete')}>
        {t('action.deleteN', { n: fmt(n) })}
      </Button>
    </>
  );
}

// ---- confirm dialog -----------------------------------------------------------------------

function ConfirmDialog() {
  const d = S.confirmDialog.value;
  const [typed, setTyped] = useState('');
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setTyped('');
    if (d) cancelRef.current?.focus();
  }, [!!d]);
  if (!d) return null;
  const needsWord = d.count !== null && d.count > TYPE_TO_CONFIRM_ABOVE;
  const word = t('confirm.word');
  const canConfirm = !needsWord || typed.trim().toUpperCase() === word;
  return (
    <div class="overlay" onClick={e => e.target === e.currentTarget && d.resolve(false)} onKeyDown={e => e.key === 'Escape' && d.resolve(false)}>
      <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="udr-confirm-title">
        <h2 id="udr-confirm-title"><span class="danger-icon"><Icon name="trash" /></span>{t('confirm.title')}</h2>
        {d.counting ? (
          <p class="row"><span class="spinner" />{t('confirm.counting')}</p>
        ) : (
          <p class="big-num">
            {d.count !== null ? t('confirm.count', { count: fmt(d.count), targets: d.targets }) : t('confirm.countUnknown', { targets: d.targets })}
          </p>
        )}
        <p>{t('confirm.irreversible')}</p>
        <label class="row small" style={{ cursor: 'pointer' }}>
          <input type="checkbox" class="check" checked={S.settings.value.archive} onChange={e => S.updateSettings({ archive: e.currentTarget.checked })} />
          {t('confirm.archive')}
        </label>
        {needsWord && (
          <div class="field">
            <label>{t('confirm.typeToConfirm', { n: fmt(TYPE_TO_CONFIRM_ABOVE) })}</label>
            <input class="input mono" value={typed} placeholder={word} onInput={e => setTyped(e.currentTarget.value)} onKeyDown={e => e.key === 'Enter' && canConfirm && d.resolve(true)} />
          </div>
        )}
        <div class="row end">
          <button type="button" ref={cancelRef} class="btn" onClick={() => d.resolve(false)}>{t('action.cancel')}</button>
          <Button variant="danger" icon="trash" disabled={!canConfirm || d.counting} onClick={() => d.resolve(true)}>{t('action.delete')}</Button>
        </div>
      </div>
    </div>
  );
}

// ---- floating button & toasts ----------------------------------------------------------------

function Fab() {
  const mode = S.settings.value.fab;
  const visible = mode === 'always' || (mode === 'auto' && !S.ui.toolbarMounted.value);
  if (!visible) return null;
  const status = S.run.status.value;
  const active = status === 'running' || status === 'paused';
  const pct = active ? percentDone() : null;
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <button type="button" class="fab" title={`${BRAND} (${SHORTCUT_LABEL})`} aria-label={BRAND} onClick={toggleWindow}>
      <Icon name="trash" />
      {active && (
        <svg class="ring" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r={r} stroke="rgba(255,255,255,.18)" />
          <circle
            cx="28" cy="28" r={r} stroke="#fff" stroke-linecap="round" transform="rotate(-90 28 28)"
            stroke-dasharray={`${c}`} stroke-dashoffset={`${c * (1 - (pct ?? 15) / 100)}`}
          >
            {pct === null && <animateTransform attributeName="transform" type="rotate" from="0 28 28" to="360 28 28" dur="1.2s" repeatCount="indefinite" />}
          </circle>
        </svg>
      )}
    </button>
  );
}

const TOAST_ICON: Record<S.Toast['kind'], IconName> = { info: 'info', success: 'checkCircle', warn: 'alert', error: 'xCircle' };

function Toasts() {
  return (
    <div class="toasts" role="status" aria-live="polite">
      {S.toasts.value.map(x => (
        <div class={`toast ${x.kind}`} key={x.id} onClick={() => dismissToast(x.id)}>
          <Icon name={TOAST_ICON[x.kind]} />
          {x.text}
        </div>
      ))}
    </div>
  );
}
