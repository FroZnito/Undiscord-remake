import type { Signal } from '@preact/signals';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { fmt, t } from '../../i18n';
import type { DiscordChannel } from '../../core/types';
import {
  cancelCount, countList, dmLabel, loadDms, loadGuildChannels, loadGuilds, parseCustomTargets, toggleExcludedChannel,
} from '../controller';
import { avatarUrl, channelLabel, describeChannel, guildIconUrl } from '../format';
import * as S from '../state';
import { Icon, type IconName } from '../components/Icon';
import { Avatar, Button, Empty, Segmented } from '../components/primitives';

export function TargetPanel() {
  const mode = S.target.mode.value;
  return (
    <div class="stack tight">
      <Segmented
        label={t('target.title')}
        value={mode}
        onChange={v => (S.target.mode.value = v)}
        options={[
          { value: 'channel', label: t('target.channel'), icon: 'hash' },
          { value: 'guild', label: t('target.guild'), icon: 'server' },
          { value: 'dms', label: t('target.dms'), icon: 'message' },
          { value: 'guilds', label: t('target.guilds'), icon: 'globe' },
          { value: 'custom', label: t('target.custom'), icon: 'list' },
        ]}
      />
      {mode === 'channel' && <CurrentChannel />}
      {mode === 'guild' && <CurrentGuild />}
      {mode === 'dms' && <DmList />}
      {mode === 'guilds' && <GuildList />}
      {mode === 'custom' && <CustomTargets />}
    </div>
  );
}

function CurrentChannel() {
  const loc = S.discord.location.value;
  const info = S.discord.channelInfo.value;
  if (!loc.channelId) return <div class="current"><Empty icon="hash">{t('target.noChannel')}</Empty></div>;
  const icon: IconName = info?.kind === 'dm' ? 'message' : info?.kind === 'group' ? 'users' : 'hash';
  const label = info ? channelLabel(info, S.currentGuild.value?.name) : t('target.loading');
  return (
    <div class="current">
      <Avatar url={info?.iconUrl} name={info?.name ?? '#'} icon={info?.iconUrl ? undefined : icon} size="lg" square={info?.kind === 'guild'} />
      <div class="meta">
        <b class="priv">{label}</b>
        <span>{t('target.channelDesc')}</span>
      </div>
    </div>
  );
}

function CurrentGuild() {
  const g = S.currentGuild.value;
  if (!g) return <div class="current"><Empty icon="server">{t('target.noGuild')}</Empty></div>;
  return (
    <>
      <div class="current">
        <Avatar url={guildIconUrl(g)} name={g.name} square size="lg" />
        <div class="meta">
          <b class="priv">{g.name}</b>
          <span>{t('target.guildDesc')}</span>
        </div>
      </div>
      <ChannelExclusions guildId={g.id} />
    </>
  );
}

// Text-capable channel types: text, voice (text chat), announcement, stage, forum, media.
const MESSAGE_CHANNEL_TYPES = new Set([0, 2, 5, 13, 15, 16]);
const channelIcon = (type: number): IconName => (type === 2 || type === 13 ? 'users' : type === 15 || type === 16 ? 'list' : 'hash');

interface ChannelGroup {
  id: string;
  name: string | null;
  channels: DiscordChannel[];
}

function groupChannels(all: DiscordChannel[]): ChannelGroup[] {
  const byPos = (a: DiscordChannel, b: DiscordChannel) => (a.position ?? 0) - (b.position ?? 0);
  const categories = all.filter(c => c.type === 4).sort(byPos);
  const channels = all.filter(c => MESSAGE_CHANNEL_TYPES.has(c.type)).sort(byPos);
  const groups: ChannelGroup[] = [
    { id: 'none', name: null, channels: channels.filter(c => !c.parent_id || !categories.some(k => k.id === c.parent_id)) },
    ...categories.map(k => ({ id: k.id, name: k.name ?? '', channels: channels.filter(c => c.parent_id === k.id) })),
  ];
  return groups.filter(gr => gr.channels.length);
}

/** Lets the user spare some channels when wiping a whole server. Remembered per server. */
function ChannelExclusions({ guildId }: { guildId: string }) {
  const [open, setOpen] = useState(false);
  const state = S.discord.guildChannels.value[guildId];
  const excluded = new Set(S.target.excluded.value[guildId] ?? []);
  useEffect(() => {
    if (open) void loadGuildChannels(guildId);
  }, [open, guildId]);
  const groups = useMemo(() => groupChannels(Array.isArray(state) ? state : []), [state]);

  return (
    <div class="card flat">
      <div class="list-row" role="button" tabIndex={0} aria-expanded={open}
        onClick={() => setOpen(!open)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(!open))}>
        <Icon name="filter" size="sm" class="muted" />
        <span class="name">{t('target.channels')}</span>
        <span class={`pill${excluded.size ? ' warn' : ''}`}>
          {excluded.size ? t('target.excludedCount', { n: excluded.size }) : t('target.allChannels')}
        </span>
        <Icon name="chevronDown" size="sm" class={open ? undefined : 'rot'} />
      </div>
      {open && (
        <>
          <div class="list-foot" style={{ borderTop: '1px solid var(--line)' }}>{t('target.channelsHint')}</div>
          <div class="list scroll">
            {state === 'loading' || state === undefined ? (
              <div class="empty"><div class="spinner" />{t('target.loading')}</div>
            ) : state === 'error' ? (
              <Empty icon="alert">{t('target.loadChannelsError')}</Empty>
            ) : groups.map(gr => {
              const ids = gr.channels.map(c => c.id);
              const off = ids.filter(id => excluded.has(id)).length;
              return (
                <div key={gr.id}>
                  <label class="list-group">
                    <input
                      type="checkbox"
                      class="check"
                      checked={off === 0}
                      ref={el => {
                        if (el) el.indeterminate = off > 0 && off < ids.length;
                      }}
                      onChange={() => toggleExcludedChannel(guildId, ids, off === 0)}
                    />
                    <span class="priv">{gr.name ?? t('target.noCategory')}</span>
                  </label>
                  {gr.channels.map(ch => {
                    const on = !excluded.has(ch.id);
                    return (
                      <label class={`list-row sub-row${on ? '' : ' off'}`} key={ch.id}>
                        <input type="checkbox" class="check" checked={on} onChange={() => toggleExcludedChannel(guildId, [ch.id], on)} />
                        <Icon name={channelIcon(ch.type)} size="sm" class="muted" />
                        <span class="name priv">{ch.name}</span>
                      </label>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

interface Item {
  id: string;
  name: string;
  sub?: string;
  iconUrl: string | null;
  square?: boolean;
  icon?: IconName;
  badge?: string;
}

function DmList() {
  useEffect(() => void loadDms(), []);
  const dms = S.discord.dms.value;
  const items = useMemo<Item[]>(() => (dms ?? []).map(ch => {
    const info = describeChannel(ch);
    return {
      id: ch.id,
      name: dmLabel(ch),
      sub: ch.type === 3 ? `${ch.recipients?.length ?? 0} 👤` : undefined,
      iconUrl: info.iconUrl ?? (ch.type === 1 ? avatarUrl(ch.recipients?.[0]) : null),
      icon: ch.type === 3 ? 'users' : undefined,
    };
  }), [dms]);
  return (
    <SelectList
      kind="dms"
      items={items}
      loading={S.discord.dmsLoading.value && !dms}
      selection={S.target.dms}
      onRefresh={() => loadDms(true)}
    />
  );
}

function GuildList() {
  useEffect(() => void loadGuilds(), []);
  const guilds = S.discord.guilds.value;
  const excluded = S.target.excluded.value;
  const items = useMemo<Item[]>(
    () => (guilds ?? []).map(g => ({
      id: g.id,
      name: g.name,
      iconUrl: guildIconUrl(g),
      square: true,
      badge: excluded[g.id]?.length ? t('target.excludedShort', { n: excluded[g.id].length }) : undefined,
    })),
    [guilds, excluded],
  );
  return (
    <SelectList
      kind="guilds"
      items={items}
      loading={S.discord.guildsLoading.value && !guilds}
      selection={S.target.guilds}
      onRefresh={() => loadGuilds(true)}
    />
  );
}

function SelectList(props: {
  kind: 'dms' | 'guilds';
  items: Item[];
  loading: boolean;
  /** Read with peek() in handlers so quick successive clicks never use a stale copy. */
  selection: Signal<string[]>;
  onRefresh: () => void;
}) {
  const [query, setQuery] = useState('');
  const [byCount, setByCount] = useState(false);
  const counts = S.discord.counts.value;
  const counting = S.discord.counting.value;
  const selectedIds = props.selection.value;
  const selected = new Set(selectedIds);
  const update = (fn: (s: Set<string>) => void) => {
    const next = new Set(props.selection.peek());
    fn(next);
    props.selection.value = [...next];
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? props.items.filter(i => i.name.toLowerCase().includes(q)) : props.items;
    if (!byCount) return list;
    const n = (id: string) => (typeof counts[id] === 'number' ? (counts[id] as number) : -1);
    return [...list].sort((a, b) => n(b.id) - n(a.id));
  }, [props.items, query, byCount, counts]);

  const toggle = (id: string) => update(s => {
    if (!s.delete(id)) s.add(id);
  });
  const allVisibleSelected = visible.length > 0 && visible.every(i => selected.has(i.id));
  const selectVisible = (on: boolean) => update(s => {
    for (const i of visible) on ? s.add(i.id) : s.delete(i.id);
  });
  const totalCounted = selectedIds.reduce((n, id) => n + (typeof counts[id] === 'number' ? (counts[id] as number) : 0), 0);

  return (
    <div class="card flat">
      <div class="list-toolbar">
        <div class="input-wrap">
          <Icon name="search" size="sm" />
          <input class="input" value={query} placeholder={t('target.filterList')} onInput={e => setQuery(e.currentTarget.value)} />
        </div>
        <Button small onClick={() => selectVisible(!allVisibleSelected)}>
          {allVisibleSelected ? t('target.none') : t('target.all')}
        </Button>
        <Button small variant={byCount ? undefined : 'ghost'} icon="sort" title={t('target.sortByCount')} onClick={() => setByCount(!byCount)} />
        {counting ? (
          <Button small icon="x" onClick={cancelCount}>{t('target.counting', { done: counting.done, total: counting.total })}</Button>
        ) : (
          <Button small icon="zap" title={t('target.countHint')} onClick={() => countList(props.kind)}>{t('target.count')}</Button>
        )}
        <Button small variant="ghost" icon="refresh" title={t('target.refresh')} onClick={props.onRefresh} />
      </div>
      <div class="list scroll">
        {props.loading ? (
          <div class="empty"><div class="spinner" />{t('target.loading')}</div>
        ) : visible.length === 0 ? (
          <Empty icon="search">{t('target.empty')}</Empty>
        ) : (
          visible.map(item => {
            const on = selected.has(item.id);
            const c = counts[item.id];
            return (
              <div class={`list-row${on ? ' on' : ''}`} onClick={() => toggle(item.id)} key={item.id}>
                <input type="checkbox" class="check" checked={on} onClick={e => e.stopPropagation()} onChange={() => toggle(item.id)} aria-label={item.name} />
                <Avatar url={item.iconUrl} name={item.name} square={item.square} icon={item.iconUrl ? undefined : item.icon} />
                <span class="name priv">{item.name}</span>
                {item.sub && <span class="sub">{item.sub}</span>}
                {item.badge && <span class="pill warn">{item.badge}</span>}
                {c === 'loading' ? <div class="spinner" /> : c === 'error' ? <Icon name="alert" size="sm" class="muted" />
                  : typeof c === 'number' ? <span class={`pill${c > 0 ? ' accent' : ''}`}>{fmt(c)}</span> : null}
              </div>
            );
          })
        )}
      </div>
      <div class="list-foot">
        <span>{t('target.selected', { n: selectedIds.length })}</span>
        {totalCounted > 0 && <span>· {fmt(totalCounted)} msg</span>}
      </div>
    </div>
  );
}

function CustomTargets() {
  const text = S.target.custom.value;
  const parsed = useMemo(() => parseCustomTargets(text), [text]);
  return (
    <div class="field">
      <textarea
        class="textarea"
        rows={5}
        value={text}
        spellcheck={false}
        placeholder={'123456789012345678\n111111111111111111/222222222222222222\nhttps://discord.com/channels/@me/333333333333333333'}
        onInput={e => (S.target.custom.value = e.currentTarget.value)}
      />
      <span class="hint">{t('target.customHint')}</span>
      {text.trim() && <span class="pill accent" style={{ alignSelf: 'flex-start' }}>{t('target.customCount', { n: parsed.length })}</span>}
    </div>
  );
}
