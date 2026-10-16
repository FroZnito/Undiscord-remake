import { compileRegex, HAS_KINDS, type HasKind } from '../../core/filters';
import { t } from '../../i18n';
import { pickBound } from '../controller';
import { daysAgoLocal, userName } from '../format';
import * as S from '../state';
import { Button, Chip, Field, Segmented } from '../components/primitives';
import type { IconName } from '../components/Icon';

const HAS_ICONS: Record<HasKind, IconName> = {
  link: 'external', file: 'paperclip', image: 'eye', video: 'play', embed: 'list', sound: 'bell', sticker: 'sparkles', poll: 'checkCircle',
};

const PRESETS: [string, number][] = [['preset.1d', 1], ['preset.7d', 7], ['preset.30d', 30], ['preset.1y', 365]];

export function FilterForm() {
  const f = S.filter.value;
  const me = S.discord.me.value;
  const set = S.updateFilter;
  const regexError = compileRegex(f.pattern).error;

  const toggleKind = (list: 'has' | 'exclude', k: HasKind) => {
    const current = f[list];
    const next = current.includes(k) ? current.filter(x => x !== k) : [...current, k];
    // A kind cannot be both required and excluded.
    const other = list === 'has' ? 'exclude' : 'has';
    set({ [list]: next, [other]: f[other].filter(x => x !== k) } as Partial<S.UiFilter>);
  };

  return (
    <div class="card stack">
      <Field label={t('filters.author')} hint={f.authorMode === 'custom' ? t('filters.authorCustomHint') : undefined}>
        <div class="row wrap">
          <Segmented
            value={f.authorMode}
            onChange={v => set({ authorMode: v })}
            options={[
              { value: 'me', label: me ? <span class="priv">{t('filters.authorMe')} · {userName(me)}</span> : t('filters.authorMe'), icon: 'user' },
              { value: 'custom', label: t('filters.authorCustom'), icon: 'users' },
            ]}
          />
          {f.authorMode === 'custom' && (
            <input
              class="input mono grow"
              value={f.authorCustom}
              placeholder={t('filters.authorCustomPh')}
              onInput={e => set({ authorCustom: e.currentTarget.value })}
            />
          )}
        </div>
      </Field>

      <div class="grid-2">
        <Field label={t('filters.content')}>
          <input class="input priv" value={f.content} placeholder={t('filters.contentPh')} onInput={e => set({ content: e.currentTarget.value })} />
        </Field>
        <Field
          label={t('filters.pattern')}
          error={regexError ? t('filters.patternInvalid', { error: regexError }) : null}
          hint={t('filters.patternHint')}
        >
          <input
            class={`input mono priv${regexError ? ' invalid' : ''}`}
            value={f.pattern}
            spellcheck={false}
            placeholder={t('filters.patternPh')}
            onInput={e => set({ pattern: e.currentTarget.value })}
          />
        </Field>
      </div>

      <Field label={t('filters.has')}>
        <div class="chips">
          {HAS_KINDS.map(k => (
            <Chip on={f.has.includes(k)} icon={HAS_ICONS[k]} onClick={() => toggleKind('has', k)}>{t(`has.${k}`)}</Chip>
          ))}
        </div>
      </Field>
      <Field label={t('filters.exclude')}>
        <div class="chips">
          {HAS_KINDS.map(k => (
            <Chip on={f.exclude.includes(k)} negative icon={HAS_ICONS[k]} onClick={() => toggleKind('exclude', k)}>{t(`has.${k}`)}</Chip>
          ))}
        </div>
      </Field>

      <Field label={t('filters.pinned')}>
        <Segmented
          value={f.pinned}
          onChange={v => set({ pinned: v })}
          options={[
            { value: 'exclude', label: t('pinned.exclude') },
            { value: 'include', label: t('pinned.include') },
            { value: 'only', label: t('pinned.only') },
          ]}
        />
      </Field>

      <hr class="sep" />

      <Field label={t('filters.period')}>
        <div class="grid-2">
          <div class="field">
            <span class="hint">{t('filters.after')}</span>
            <input type="datetime-local" class="input" value={f.afterDate} onInput={e => set({ afterDate: e.currentTarget.value })} />
          </div>
          <div class="field">
            <span class="hint">{t('filters.before')}</span>
            <input type="datetime-local" class="input" value={f.beforeDate} onInput={e => set({ beforeDate: e.currentTarget.value })} />
          </div>
        </div>
        <div class="row wrap">
          <span class="hint">{t('filters.olderThan')}</span>
          {PRESETS.map(([key, days]) => (
            <Chip on={false} icon="clock" onClick={() => set({ beforeDate: daysAgoLocal(days), afterDate: '' })}>{t(key)}</Chip>
          ))}
          {(f.afterDate || f.beforeDate) && (
            <Button small variant="ghost" icon="x" onClick={() => set({ afterDate: '', beforeDate: '' })}>{t('action.clear')}</Button>
          )}
        </div>
      </Field>

      <Field label={t('filters.range')}>
        <div class="grid-2">
          <div class="row">
            <input class="input mono" value={f.afterId} placeholder={`${t('filters.afterMessage')} — ${t('filters.messageIdPh')}`} onInput={e => set({ afterId: e.currentTarget.value.trim() })} />
            <Button small icon="crosshair" title={t('filters.pickBanner')} onClick={() => pickBound('after')}>{t('filters.pick')}</Button>
          </div>
          <div class="row">
            <input class="input mono" value={f.beforeId} placeholder={`${t('filters.beforeMessage')} — ${t('filters.messageIdPh')}`} onInput={e => set({ beforeId: e.currentTarget.value.trim() })} />
            <Button small icon="crosshair" title={t('filters.pickBanner')} onClick={() => pickBound('before')}>{t('filters.pick')}</Button>
          </div>
        </div>
      </Field>

      <label class="row small" style={{ cursor: 'pointer' }}>
        <input type="checkbox" class="check" checked={f.includeNsfw} onChange={e => set({ includeNsfw: e.currentTarget.checked })} />
        {t('filters.nsfw')}
      </label>
    </div>
  );
}
