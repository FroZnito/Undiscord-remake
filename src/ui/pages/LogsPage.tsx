import { useEffect, useRef, useState } from 'preact/hooks';
import type { LogLevel } from '../../core/engine';
import { downloadFile, timestampForFile } from '../../core/util';
import { t } from '../../i18n';
import { copyText } from '../controller';
import * as S from '../state';
import { Button, Chip, Empty } from '../components/primitives';

const LEVELS: LogLevel[] = ['debug', 'info', 'success', 'warn', 'error'];
const SHOWN = 1200;

const lineText = (e: S.LogEntry) => `${new Date(e.time).toLocaleTimeString()} [${e.level}] ${t(e.key, e.params)}`;

export function LogsPage() {
  S.logs.version.value; // subscribe
  const [hidden, setHidden] = useState<Set<LogLevel>>(new Set());
  const [auto, setAuto] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const entries = S.logs.items.filter(e => !hidden.has(e.level));
  const shown = entries.slice(-SHOWN);

  useEffect(() => {
    // scrollTop rather than scrollIntoView, which could also scroll Discord's page.
    if (auto && boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  });

  const toggle = (l: LogLevel) => {
    const next = new Set(hidden);
    if (!next.delete(l)) next.add(l);
    setHidden(next);
  };
  const all = () => S.logs.items.map(lineText).join('\n');

  return (
    <>
      <div class="row wrap">
        <div class="chips">
          {LEVELS.map(l => <Chip on={!hidden.has(l)} onClick={() => toggle(l)}>{t(`level.${l}`)}</Chip>)}
        </div>
        <div class="spacer" />
        <label class="row small" style={{ cursor: 'pointer' }}>
          <input type="checkbox" class="check" checked={auto} onChange={e => setAuto(e.currentTarget.checked)} />
          {t('logs.autoscroll')}
        </label>
      </div>
      <div class="row">
        <Button small icon="copy" onClick={() => copyText(all())}>{t('action.copy')}</Button>
        <Button small icon="download" onClick={() => downloadFile(all(), `undiscord-log-${timestampForFile()}.txt`, 'text/plain')}>{t('action.export')}</Button>
        <Button small variant="ghost" icon="trash" onClick={() => S.logs.clear()}>{t('action.clear')}</Button>
      </div>
      <div class="card flat">
        {shown.length === 0 ? <Empty icon="log">{t('logs.empty')}</Empty> : (
          <div class="scroll log" style={{ maxHeight: '460px' }} ref={boxRef}>
            {shown.map(e => (
              <div class={`log-row ${e.level}`} key={e.id}>
                <span class="lvl" />
                <time>{new Date(e.time).toLocaleTimeString()}</time>
                <span class={e.sensitive ? 'priv' : undefined}>{t(e.key, e.params)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
