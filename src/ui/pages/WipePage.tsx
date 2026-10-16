import { useEffect, useRef, useState } from 'preact/hooks';
import { jobProcessed, type Job } from '../../core/engine';
import type { MessageRecord } from '../../core/types';
import { formatDuration } from '../../core/util';
import { fmt, t } from '../../i18n';
import {
  applyPreset, deletePreset, discardSession, exportRecords, resumeSession, savePreset, toggleExcluded,
} from '../controller';
import { formatDate, truncate } from '../format';
import * as S from '../state';
import { Icon, type IconName } from '../components/Icon';
import { Banner, Button, Empty, Progress, Section, Stat } from '../components/primitives';
import { FilterForm } from './FilterForm';
import { TargetPanel } from './TargetPanel';

export function WipePage() {
  const view = S.ui.wipeView.value;
  if (view === 'run') return <RunView />;
  if (view === 'results') return <ResultsView />;
  return <WipeForm />;
}

export function AccountBanner() {
  const state = S.discord.tokenState.value;
  if (state === 'ok') return null;
  if (state === 'detecting') {
    return <Banner tone="info" icon="key" title={t('account.detecting')} />;
  }
  return (
    <Banner
      tone={state === 'invalid' ? 'danger' : 'warn'}
      icon="key"
      title={state === 'invalid' ? t('account.invalid') : t('account.missing')}
      actions={<Button small onClick={() => (S.ui.tab.value = 'settings')}>{t('nav.settings')}</Button>}
    >
      {t('account.missingHint')}
    </Banner>
  );
}

function SessionBanner() {
  const snap = S.savedSession.value;
  if (!snap || S.run.status.value === 'running' || S.run.status.value === 'paused') return null;
  const left = snap.jobs.filter(j => j.status !== 'done' && j.status !== 'skipped').length;
  if (!left) return null;
  return (
    <Banner
      tone="info"
      icon="history"
      title={t('session.found', { n: left })}
      actions={
        <>
          <Button small variant="ghost" onClick={discardSession}>{t('session.discard')}</Button>
          <Button small variant="primary" icon="play" onClick={() => void resumeSession()}>{t('session.resume')}</Button>
        </>
      }
    />
  );
}

function WipeForm() {
  const f = S.filter.value;
  const active = S.activeFilterCount(f);
  const mode = S.settings.value.mode;
  return (
    <>
      <AccountBanner />
      <SessionBanner />
      <PresetsBar />
      <Section title={t('target.title')}>
        <TargetPanel />
      </Section>
      <Section
        title={t('filters.title')}
        open={S.ui.filtersOpen.value}
        onToggle={() => (S.ui.filtersOpen.value = !S.ui.filtersOpen.value)}
        aside={
          <>
            {active > 0 && <span class="pill accent">{t('filters.active', { n: active })}</span>}
            {active > 0 && (
              <Button small variant="ghost" onClick={() => (S.filter.value = { ...S.defaultUiFilter(), authorMode: f.authorMode, authorCustom: f.authorCustom })}>
                {t('filters.reset')}
              </Button>
            )}
          </>
        }
      >
        <FilterForm />
      </Section>
      <Section title={t('mode.title')}>
        <div class="mode-cards">
          <ModeCard on={mode === 'search'} icon="zap" title={t('mode.search')} desc={t('mode.searchDesc')} onClick={() => S.updateSettings({ mode: 'search' })} />
          <ModeCard on={mode === 'history'} icon="history" title={t('mode.history')} desc={t('mode.historyDesc')} onClick={() => S.updateSettings({ mode: 'history' })} />
        </div>
      </Section>
    </>
  );
}

/** Saved setups (target + filters + method), applied in one click. */
function PresetsBar() {
  const list = S.presets.value;
  const busy = S.run.status.value === 'running' || S.run.status.value === 'paused';
  const [naming, setNaming] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (naming) inputRef.current?.focus();
  }, [naming]);
  const close = () => {
    setNaming(false);
    setName('');
  };
  const submit = () => {
    if (!name.trim()) return;
    savePreset(name);
    close();
  };

  return (
    <div class="presets">
      <span class="label"><Icon name="bookmark" size="sm" />{t('presets.title')}</span>
      {list.map(p => (
        <span class="preset-chip" key={p.id}>
          <button type="button" disabled={busy} onClick={() => applyPreset(p.id)}>{p.name}</button>
          <button type="button" class="x" title={t('presets.delete')} aria-label={t('presets.delete')} onClick={() => deletePreset(p.id)}>
            <Icon name="x" size="sm" />
          </button>
        </span>
      ))}
      {naming ? (
        <span class="row">
          <input
            ref={inputRef}
            class="input sm"
            value={name}
            maxLength={40}
            placeholder={t('presets.namePh')}
            onInput={e => setName(e.currentTarget.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') submit();
              if (e.key === 'Escape') close();
            }}
          />
          <Button small variant="primary" disabled={!name.trim()} onClick={submit}>{t('presets.save')}</Button>
          <Button small variant="ghost" icon="x" aria-label={t('action.cancel')} onClick={close} />
        </span>
      ) : (
        <Button small variant="ghost" icon="plus" onClick={() => setNaming(true)}>{t('presets.saveCurrent')}</Button>
      )}
      {!list.length && !naming && <span class="hint">{t('presets.empty')}</span>}
    </div>
  );
}

function ModeCard(props: { on: boolean; icon: IconName; title: string; desc: string; onClick: () => void }) {
  return (
    <button type="button" class={`mode-card${props.on ? ' on' : ''}`} aria-pressed={props.on} onClick={props.onClick}>
      <Icon name={props.icon} />
      <div>
        <b>{props.title}</b>
        <span>{props.desc}</span>
      </div>
    </button>
  );
}

// ---- live run dashboard ---------------------------------------------------------------

export function percentDone(stats = S.run.stats.value): number | null {
  if (stats.total === null || stats.total === 0) return stats.total === 0 && S.run.status.value === 'finished' ? 100 : null;
  return Math.min(100, (stats.processed / stats.total) * 100);
}

function RunView() {
  const status = S.run.status.value;
  const stats = S.run.stats.value;
  const jobs = S.run.jobs.value;
  const preview = S.run.kind.value === 'preview';
  const pct = percentDone(stats);
  const finished = status === 'finished';

  return (
    <>
      <div class="hero">
        <div class="row">
          <StatusPill />
          <span class="muted small">{t('run.elapsed')} {formatDuration(stats.elapsedMs)}</span>
          <div class="spacer" />
          {finished && <Button small icon="chevronLeft" onClick={() => (S.ui.wipeView.value = 'form')}>{t('action.newRun')}</Button>}
        </div>
        <div class="hero-top">
          <div class="hero-pct">{pct === null ? '—' : `${Math.floor(pct)}%`}</div>
          <div class="hero-sub">
            {stats.total !== null ? t('run.of', { done: fmt(stats.processed), total: fmt(stats.total) }) : t('run.unknownTotal')}
            {stats.etaMs !== null && !finished && <> · {t('run.eta')} ~{formatDuration(stats.etaMs)}</>}
          </div>
        </div>
        <Progress value={finished ? 100 : pct} tone={preview ? undefined : 'danger'} paused={status === 'paused'} />
      </div>

      <div class="stats">
        {preview
          ? <Stat label={t('run.matched')} value={fmt(stats.matched)} tone="success" />
          : <Stat label={t('run.deleted')} value={fmt(stats.deleted)} tone="success" />}
        <Stat label={t('run.failed')} value={fmt(stats.failed)} tone={stats.failed ? 'danger' : undefined} />
        <Stat label={t('run.skipped')} value={fmt(stats.skipped)} />
        <Stat label={t('run.speed')} value={t('run.perMin', { n: fmt(stats.speedPerMin) })} />
        <Stat label={t('run.delay')} value={`${fmt(stats.delay)} ms`} />
        <Stat label={t('run.rateLimits')} value={fmt(stats.rateLimits)} />
      </div>

      <div class="two-col">
        <JobList jobs={jobs} />
        <RecentFeed preview={preview} />
      </div>
    </>
  );
}

export function StatusPill() {
  const status = S.run.status.value;
  const tone = status === 'running' ? 'accent' : status === 'paused' ? 'warn' : status === 'finished' ? 'success' : '';
  return (
    <span class={`pill ${tone}`}>
      <span class={`dot${status === 'running' ? ' pulse' : ''}`} />
      {t(`status.${status}`)}
    </span>
  );
}

const JOB_ICON: Record<Job['status'], IconName> = {
  pending: 'clock', running: 'zap', done: 'checkCircle', skipped: 'skip', failed: 'xCircle', stopped: 'stop',
};

function JobList({ jobs }: { jobs: Job[] }) {
  const done = jobs.filter(j => j.status === 'done' || j.status === 'skipped').length;
  return (
    <div class="card flat">
      <div class="panel-title">
        <Icon name="list" size="sm" />
        {t('run.jobs')}
        <span class="pill">{done}/{jobs.length}</span>
      </div>
      <div class="panel-body scroll">
        {jobs.map(j => {
          const total = j.total;
          const processed = jobProcessed(j);
          return (
            <div class={`job${j.status === 'running' ? ' running' : ''}`} key={j.id}>
              <div class="row">
                <Icon name={JOB_ICON[j.status]} size="sm" class={j.status === 'failed' ? 'muted' : undefined} />
                <b class="priv" title={j.target.label}>{j.target.label}</b>
                <span class="nums">{t(`job.${j.status}`)}</span>
              </div>
              {(j.status === 'running' || processed > 0) && (
                <>
                  <Progress small value={total ? (processed / total) * 100 : j.status === 'running' ? null : 100} />
                  <div class="nums">
                    {total !== null ? `${fmt(processed)} / ${fmt(total)}` : t('run.scanned', { n: fmt(j.scanned) })}
                    {j.deleted > 0 && ` · ${t('run.deleted').toLowerCase()} ${fmt(j.deleted)}`}
                    {j.failed > 0 && ` · ${t('run.failed').toLowerCase()} ${fmt(j.failed)}`}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentFeed({ preview }: { preview: boolean }) {
  S.run.recent.version.value; // subscribe
  const items = [...S.run.recent.items].reverse().slice(0, 30);
  return (
    <div class="card flat">
      <div class="panel-title">
        <Icon name={preview ? 'eye' : 'trash'} size="sm" />
        {preview ? t('run.recentPreview') : t('run.recent')}
      </div>
      <div class="panel-body scroll">
        {items.length === 0 ? (
          <div class="empty">
            {S.run.status.value === 'running' && <div class="spinner" />}
            {t('run.waiting')}
          </div>
        ) : (
          items.map(r => (
            <div class="feed-item" key={r.id}>
              <Icon name={r.status === 'deleted' ? 'trash' : 'eye'} size="sm" class="muted" />
              <div class="body">
                <div class="where"><span class="priv ellipsis">{r.where}</span><span class="nowrap">· {formatDate(r.timestamp)}</span></div>
                <div class={`text priv${r.status === 'deleted' ? ' strike' : ''}`}>{recordText(r)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const recordText = (r: MessageRecord) =>
  truncate(r.content || r.attachments.map(a => `📎 ${a.filename}`).join(' ') || '—', 300);

// ---- preview results ----------------------------------------------------------------------

const RESULT_LIMIT = 1500;

function ResultsView() {
  S.preview.results.version.value; // subscribe
  const results = S.preview.results.items;
  const excluded = S.preview.excluded.value;
  const status = S.run.status.value;
  const running = status === 'running' || status === 'paused';
  const selectedCount = results.length - results.filter(r => excluded.has(r.id)).length;
  const shown = results.slice(0, RESULT_LIMIT);
  const allOn = excluded.size === 0;

  return (
    <>
      <div class="row">
        <Button small variant="ghost" icon="chevronLeft" onClick={() => (S.ui.wipeView.value = 'form')} disabled={running}>{t('action.back')}</Button>
        <h3 style={{ margin: 0, fontSize: '16px' }}>{t('results.title')}</h3>
        <StatusPill />
        <div class="spacer" />
        <ExportMenu records={() => results.filter(r => !excluded.has(r.id))} name="undiscord-apercu" disabled={!results.length} />
      </div>
      {running ? (
        <div class="stack tight">
          <Progress value={percentDone()} />
          <span class="hint">{t('results.running')}</span>
        </div>
      ) : (
        <span class="hint">{t('results.hint')}</span>
      )}
      <div class="card flat">
        <div class="list-toolbar">
          <input
            type="checkbox"
            class="check"
            checked={allOn && results.length > 0}
            ref={el => {
              if (el) el.indeterminate = !allOn && excluded.size < results.length;
            }}
            onChange={() => (S.preview.excluded.value = allOn ? new Set(results.map(r => r.id)) : new Set())}
            aria-label={t('target.all')}
          />
          <span class="small muted">{t('results.selected', { n: fmt(selectedCount), total: fmt(results.length) })}</span>
        </div>
        <div class="scroll" style={{ maxHeight: '420px' }}>
          {results.length === 0 ? (
            running ? <div class="empty"><div class="spinner" />{t('run.waiting')}</div> : <Empty icon="search">{t('results.empty')}</Empty>
          ) : (
            shown.map(r => {
              const on = !excluded.has(r.id);
              return (
                <label class={`msg-row${on ? '' : ' off'}`} key={r.id}>
                  <input type="checkbox" class="check" checked={on} onChange={() => toggleExcluded(r.id)} />
                  <div class="body">
                    <div class="top"><b class="priv">{r.where}</b><span class="nowrap">{formatDate(r.timestamp)}</span></div>
                    <div class="text priv">{r.content || <i class="muted">—</i>}</div>
                    {r.attachments.length > 0 && (
                      <div class="att priv">{r.attachments.map(a => `📎 ${a.filename}`).join('  ')}</div>
                    )}
                  </div>
                </label>
              );
            })
          )}
          {results.length > RESULT_LIMIT && <div class="list-foot">{t('results.more', { n: fmt(results.length - RESULT_LIMIT) })}</div>}
        </div>
      </div>
    </>
  );
}

export function ExportMenu(props: { records: () => MessageRecord[]; name: string; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (!e.composedPath().includes(ref.current!)) setOpen(false);
    };
    const root = ref.current!.getRootNode() as ShadowRoot;
    root.addEventListener('pointerdown', close);
    return () => root.removeEventListener('pointerdown', close);
  }, [open]);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <Button small icon="download" disabled={props.disabled} onClick={() => setOpen(!open)}>{t('action.export')}</Button>
      {open && (
        <div class="card" style={{ position: 'absolute', right: 0, top: '36px', zIndex: 5, padding: '6px', display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '140px', boxShadow: 'var(--shadow-sm)' }}>
          {(['html', 'json', 'csv'] as const).map(fmtName => (
            <Button small variant="ghost" onClick={() => { exportRecords(props.records(), fmtName, props.name); setOpen(false); }}>
              {fmtName.toUpperCase()}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
