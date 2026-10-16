import { useMemo, useState } from 'preact/hooks';
import { normalizeText } from '../../core/filters';
import { fmt, t } from '../../i18n';
import { formatDate } from '../format';
import * as S from '../state';
import { Banner, Button, Empty } from '../components/primitives';
import { ExportMenu } from './WipePage';

const PAGE = 300;

export function ArchivePage() {
  const version = S.archive.version.value;
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);
  const all = S.archive.items;

  const filtered = useMemo(() => {
    const q = normalizeText(query.trim());
    const list = q ? all.filter(r => normalizeText(`${r.content} ${r.where}`).includes(q)) : all;
    return [...list].reverse();
  }, [version, query]);

  return (
    <>
      {!S.settings.value.archive && <Banner tone="warn" title={t('archive.disabled')} />}
      <p class="hint" style={{ margin: 0 }}>{t('archive.desc')}</p>
      <div class="row wrap">
        <input class="input grow" style={{ minWidth: '180px' }} value={query} placeholder={t('archive.search')} onInput={e => setQuery(e.currentTarget.value)} />
        <span class="pill">{t('archive.count', { n: fmt(filtered.length) })}</span>
        <ExportMenu records={() => [...filtered].reverse()} name="undiscord-archive" disabled={!filtered.length} />
        <Button small variant="ghost" icon="trash" disabled={!all.length} onClick={() => S.archive.clear()}>{t('action.clear')}</Button>
      </div>
      <div class="card flat">
        {filtered.length === 0 ? <Empty icon="archive">{t('archive.empty')}</Empty> : (
          <div class="scroll" style={{ maxHeight: '480px' }}>
            {filtered.slice(0, limit).map(r => (
              <div class="msg-row" key={r.id}>
                <div class="body">
                  <div class="top"><b class="priv">{r.where}</b><span class="nowrap">{formatDate(r.timestamp)}</span></div>
                  <div class="text priv">{r.content || <i class="muted">—</i>}</div>
                  {r.attachments.length > 0 && (
                    <div class="att priv">
                      {r.attachments.map(a => <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', marginRight: '10px' }}>📎 {a.filename}</a>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {filtered.length > limit && (
              <div class="list-foot"><Button small onClick={() => setLimit(limit + PAGE)}>{t('archive.showMore')}</Button></div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
