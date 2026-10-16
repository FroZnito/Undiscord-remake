import { useMemo, useRef } from 'preact/hooks';
import type { PackageChannel } from '../../core/datapackage';
import { minSnowflake, maxSnowflake, snowflakeToDate } from '../../core/snowflake';
import { fmt, t } from '../../i18n';
import { loadPackage, packageMatcher } from '../controller';
import { formatDay, packageChannelLabel } from '../format';
import * as S from '../state';
import { Icon, type IconName } from '../components/Icon';
import { Banner, Button, Empty, Segmented } from '../components/primitives';
import { AccountBanner } from './WipePage';

const KIND_ICON: Record<PackageChannel['kind'], IconName> = { dm: 'message', group: 'users', guild: 'hash', unknown: 'list' };

export function PackagePage() {
  const data = S.pkg.data.value;
  return (
    <>
      <AccountBanner />
      {data ? <PackageTable /> : <PackageIntro />}
    </>
  );
}

function PackageIntro() {
  const zipRef = useRef<HTMLInputElement>(null);
  const dirRef = useRef<HTMLInputElement>(null);
  const loading = S.pkg.loading.value;
  const error = S.pkg.error.value;
  const onFiles = (list: FileList | null) => void loadPackage(list ? [...list] : []);

  return (
    <>
      <div class="card stack">
        <p style={{ margin: 0 }}>{t('pkg.intro')}</p>
        <div>
          <div class="label" style={{ marginBottom: '6px' }}>{t('pkg.howTo')}</div>
          <ol class="steps">
            <li>{t('pkg.step1')}</li>
            <li>{t('pkg.step2')}</li>
            <li>{t('pkg.step3')}</li>
          </ol>
        </div>
      </div>

      {/* File pickers only, no drag & drop: a file dropped slightly off target would land in Discord's uploader. */}
      <div class="picker">
        <div class="big"><Icon name="package" size="lg" /></div>
        {loading ? (
          <div class="row"><div class="spinner" />{t('pkg.parsing')}</div>
        ) : (
          <>
            <Button variant="primary" icon="upload" onClick={() => zipRef.current?.click()}>{t('pkg.chooseZip')}</Button>
            <button type="button" class="link small" onClick={() => dirRef.current?.click()}>{t('pkg.chooseFolder')}</button>
          </>
        )}
        <span class="hint"><Icon name="shield" size="sm" class="muted" /> {t('pkg.local')}</span>
        <input ref={zipRef} type="file" accept=".zip,application/zip,.json" hidden onChange={e => onFiles(e.currentTarget.files)} />
        <input ref={dirRef} type="file" hidden {...{ webkitdirectory: '' }} multiple onChange={e => onFiles(e.currentTarget.files)} />
      </div>
      {error && <Banner tone="danger" title={t('pkg.error', { error })} />}
    </>
  );
}

function PackageTable() {
  const data = S.pkg.data.value!;
  const kind = S.pkg.kind.value;
  const query = S.pkg.query.value.trim().toLowerCase();
  const selected = S.pkg.selected.value;
  const filterValue = S.filter.value;
  S.discord.me.value; // the matcher depends on the account

  // Matching counts per channel, recomputed when filters change.
  const matches = useMemo(() => {
    const matcher = packageMatcher();
    const out = new Map<string, number>();
    for (const ch of data.channels) out.set(ch.id, matcher ? matcher(ch).length : 0);
    return out;
  }, [data, filterValue]);

  const kinds = useMemo(() => {
    const c = { dm: 0, group: 0, guild: 0, unknown: 0 };
    for (const ch of data.channels) c[ch.kind]++;
    return c;
  }, [data]);

  const rows = data.channels.filter(ch =>
    (kind === 'all' || ch.kind === kind) && (!query || packageChannelLabel(ch).toLowerCase().includes(query)));

  const setSelected = (s: Set<string>) => (S.pkg.selected.value = s);
  const toggle = (id: string) => {
    const next = new Set(S.pkg.selected.peek());
    if (!next.delete(id)) next.add(id);
    setSelected(next);
  };
  const allRowsOn = rows.length > 0 && rows.every(r => selected.has(r.id));
  const toggleRows = () => {
    const next = new Set(S.pkg.selected.peek());
    for (const r of rows) allRowsOn ? next.delete(r.id) : next.add(r.id);
    setSelected(next);
  };
  const matchingSelected = data.channels.reduce((n, ch) => n + (selected.has(ch.id) ? matches.get(ch.id) ?? 0 : 0), 0);

  return (
    <>
      <div class="row wrap">
        <span class="pill accent"><Icon name="package" size="sm" />{t('pkg.summary', { channels: fmt(data.channels.length), messages: fmt(data.totalMessages) })}</span>
        <div class="spacer" />
        <Button small variant="ghost" icon="refresh" onClick={() => (S.pkg.data.value = null)}>{t('pkg.change')}</Button>
      </div>
      <Banner tone="info" icon="filter">{t('pkg.filtersNote')}</Banner>
      <div class="card flat">
        <div class="list-toolbar">
          <div class="input-wrap">
            <Icon name="search" size="sm" />
            <input class="input" value={S.pkg.query.value} placeholder={t('target.filterList')} onInput={e => (S.pkg.query.value = e.currentTarget.value)} />
          </div>
          <Segmented
            value={kind}
            onChange={v => (S.pkg.kind.value = v)}
            options={[
              { value: 'all', label: t('pkg.kind.all') },
              { value: 'dm', label: `${t('pkg.kind.dm')} ${kinds.dm}` },
              { value: 'group', label: `${t('pkg.kind.group')} ${kinds.group}` },
              { value: 'guild', label: `${t('pkg.kind.guild')} ${kinds.guild}` },
            ]}
          />
        </div>
        <div class="scroll" style={{ maxHeight: '380px' }}>
          {rows.length === 0 ? <Empty icon="search">{t('target.empty')}</Empty> : (
            <table class="table">
              <thead>
                <tr>
                  <th style={{ width: '34px' }}>
                    <input type="checkbox" class="check" checked={allRowsOn} onChange={toggleRows} aria-label={t('target.all')} />
                  </th>
                  <th>{t('pkg.colName')}</th>
                  <th class="num">{t('run.matched')}</th>
                  <th class="num">{t('pkg.colTotal')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(ch => <PackageRow ch={ch} on={selected.has(ch.id)} matching={matches.get(ch.id) ?? 0} onToggle={() => toggle(ch.id)} key={ch.id} />)}
              </tbody>
            </table>
          )}
        </div>
        <div class="list-foot">
          <Icon name="filter" size="sm" />
          <b>{t('pkg.matching', { n: fmt(matchingSelected) })}</b>
        </div>
      </div>
    </>
  );
}

function PackageRow(props: { ch: PackageChannel; on: boolean; matching: number; onToggle: () => void }) {
  const { ch } = props;
  const range = useMemo(() => {
    if (!ch.messages.length) return null;
    const ids = ch.messages.map(m => m.id);
    return `${formatDay(snowflakeToDate(minSnowflake(ids)))} → ${formatDay(snowflakeToDate(maxSnowflake(ids)))}`;
  }, [ch]);
  return (
    <tr onClick={props.onToggle} style={{ cursor: 'pointer' }}>
      <td><input type="checkbox" class="check" checked={props.on} onClick={e => e.stopPropagation()} onChange={props.onToggle} /></td>
      <td class="name">
        <div class="row">
          <Icon name={KIND_ICON[ch.kind]} size="sm" class="muted" />
          <div class="grow">
            <div class="ellipsis priv">{packageChannelLabel(ch)}</div>
            <div class="muted">{range ?? t('pkg.indexOnly')}</div>
          </div>
        </div>
      </td>
      <td class="num">{ch.messages.length ? fmt(props.matching) : '—'}</td>
      <td class="num muted">{fmt(ch.messages.length)}</td>
    </tr>
  );
}
