import { useState } from 'preact/hooks';
import { t } from '../../i18n';
import { requestNotificationPermission } from '../../platform/notify';
import { forgetManualToken, refreshToken, speedValues, toast, useManualToken } from '../controller';
import { avatarUrl, userName } from '../format';
import * as S from '../state';
import { APP_NAME, AUTHOR, REPO_URL, SHORTCUT_LABEL, VERSION } from '../constants';
import { Icon } from '../components/Icon';
import { Avatar, Banner, Button, Field, RangeField, Section, Segmented, Switch } from '../components/primitives';

export function SettingsPage() {
  const s = S.settings.value;
  const set = S.updateSettings;
  const speed = speedValues();

  return (
    <>
      <Section title={t('settings.account')}>
        <AccountCard />
      </Section>

      <Section title={t('settings.speed')}>
        <div class="card stack">
          <Segmented
            full
            value={s.speed}
            onChange={v => set(v === 'custom' ? { speed: v, ...speed } : { speed: v })}
            options={[
              { value: 'safe', label: t('speed.safe'), icon: 'shield' },
              { value: 'balanced', label: t('speed.balanced') },
              { value: 'fast', label: t('speed.fast'), icon: 'zap' },
              { value: 'custom', label: t('speed.custom'), icon: 'sliders' },
            ]}
          />
          <div class="grid-2">
            <RangeField
              label={t('settings.searchDelay')}
              value={speed.searchDelay}
              min={300}
              max={15000}
              step={100}
              onChange={v => set({ speed: 'custom', searchDelay: v, deleteDelay: speed.deleteDelay })}
            />
            <RangeField
              label={t('settings.deleteDelay')}
              value={speed.deleteDelay}
              min={150}
              max={10000}
              step={50}
              onChange={v => set({ speed: 'custom', deleteDelay: v, searchDelay: speed.searchDelay })}
            />
          </div>
          {speed.deleteDelay < 500 && <Banner tone="warn" title={t('settings.speedWarning')} />}
          <Switch checked={s.adaptive} onChange={v => set({ adaptive: v })} label={t('settings.adaptive')} desc={t('settings.adaptiveDesc')} />
          <div class="grid-2">
            <RangeField label={t('settings.maxAttempts')} value={s.maxAttempts} min={1} max={8} step={1} unit="" onChange={v => set({ maxAttempts: v })} />
            <RangeField label={t('settings.emptyRetries')} value={s.emptyPageRetries} min={0} max={10} step={1} unit="" onChange={v => set({ emptyPageRetries: v })} />
          </div>
        </div>
      </Section>

      <Section title={t('settings.safety')}>
        <div class="card stack tight">
          <Switch checked={s.confirm} onChange={v => set({ confirm: v })} label={t('settings.confirm')} />
          <Switch checked={s.privacy} onChange={v => set({ privacy: v })} label={t('settings.privacy')} desc={t('settings.privacyDesc')} />
          <Switch checked={s.archive} onChange={v => set({ archive: v })} label={t('settings.archive')} desc={t('settings.archiveDesc')} />
        </div>
      </Section>

      <Section title={t('settings.end')}>
        <div class="card stack tight">
          <Switch
            checked={s.notify}
            onChange={async v => {
              set({ notify: v });
              if (v) await requestNotificationPermission();
            }}
            label={t('settings.notify')}
            desc={t('settings.notifyDesc')}
          />
          <Switch checked={s.sound} onChange={v => set({ sound: v })} label={t('settings.sound')} />
        </div>
      </Section>

      <Section title={t('settings.general')}>
        <div class="card stack">
          <div class="grid-2">
            <Field label={t('settings.lang')}>
              <Segmented
                value={s.lang}
                onChange={v => set({ lang: v })}
                options={[
                  { value: 'auto', label: t('lang.auto') },
                  { value: 'fr', label: 'Français' },
                  { value: 'en', label: 'English' },
                ]}
              />
            </Field>
            <Field label={t('settings.theme')}>
              <Segmented
                value={s.theme}
                onChange={v => set({ theme: v })}
                options={[
                  { value: 'auto', label: t('theme.auto') },
                  { value: 'dark', label: t('theme.dark') },
                  { value: 'light', label: t('theme.light') },
                ]}
              />
            </Field>
          </div>
          <Field label={t('settings.fab')} hint={t('settings.fabDesc')}>
            <Segmented
              value={s.fab}
              onChange={v => set({ fab: v })}
              options={[
                { value: 'auto', label: t('fab.auto') },
                { value: 'always', label: t('fab.always') },
                { value: 'never', label: t('fab.never') },
              ]}
            />
          </Field>
          <div class="row">
            <span class="grow">{t('settings.shortcutDesc')}</span>
            <kbd>{SHORTCUT_LABEL}</kbd>
          </div>
        </div>
      </Section>

      <Section title={t('settings.about')}>
        <div class="card stack tight">
          <div class="row">
            <div class="logo"><Icon name="trash" size="sm" /></div>
            <div class="grow">
              <b>{APP_NAME}</b> <span class="muted small">v{VERSION}</span>
              <div class="small">{t('settings.madeBy', { author: AUTHOR })}</div>
              <div class="hint">{t('settings.aboutDesc')}</div>
            </div>
          </div>
          <Banner tone="warn" icon="shield">{t('settings.tos')}</Banner>
          <div class="row end">
            <a class="btn sm ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="external" size="sm" />GitHub
            </a>
            <Button
              small
              variant="ghost"
              icon="refresh"
              onClick={() => {
                S.settings.value = S.defaultSettings;
                toast('success', 'toast.resetDone');
              }}
            >
              {t('settings.reset')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function AccountCard() {
  const me = S.discord.me.value;
  const state = S.discord.tokenState.value;
  const source = S.discord.token.value?.source;
  const [draft, setDraft] = useState('');
  const [show, setShow] = useState(false);
  // No <form>: a submitted password field makes browsers offer to save it.
  const submit = () => {
    if (!draft.trim()) return;
    void useManualToken(draft);
    setDraft('');
  };

  return (
    <div class="card stack">
      <div class="row">
        <Avatar url={avatarUrl(me)} name={userName(me)} size="lg" icon={me ? undefined : 'user'} />
        <div class="grow">
          <b class="priv">{me ? userName(me) : '—'}</b>
          <div class="hint">
            {state === 'ok' && source ? (
              <span class="pill success"><Icon name="check" size="sm" />{t('settings.token')} {t(`token.${source}`)}</span>
            ) : state === 'invalid' ? (
              <span class="pill danger">{t('account.invalid')}</span>
            ) : state === 'missing' ? (
              <span class="pill warn">{t('account.missing')}</span>
            ) : (
              <span class="pill">{t('account.detecting')}</span>
            )}
          </div>
        </div>
        <Button small icon="refresh" onClick={() => void refreshToken()}>{t('settings.redetect')}</Button>
      </div>
      <Field label={t('settings.manualToken')} hint={t('settings.manualTokenHint')}>
        <div class="row">
          <div class="input-wrap grow">
            <Icon name="key" size="sm" />
            <input
              class="input mono"
              type={(show ? 'text' : 'password') as 'password'}
              name="undiscord-manual-token"
              autocomplete="off"
              data-1p-ignore
              data-lpignore="true"
              data-bwignore
              spellcheck={false}
              value={draft}
              placeholder={t('settings.manualTokenPh')}
              onInput={e => setDraft(e.currentTarget.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
            />
          </div>
          <Button small variant="ghost" icon="eye" onClick={() => setShow(!show)} />
          <Button small variant="primary" disabled={!draft.trim()} onClick={submit}>{t('settings.useToken')}</Button>
          {source === 'manual' && <Button small variant="ghost" onClick={forgetManualToken}>{t('settings.forgetToken')}</Button>}
        </div>
      </Field>
    </div>
  );
}
