import type { MessageRecord } from './types';
import { csvCell, escapeHtml } from './util';

export type ArchiveFormat = 'json' | 'csv' | 'html';

/** Who made the export, shown in the files ("Undiscord Remake by …"). */
export interface ExportCredit {
  text: string;
  url: string;
}

export function archiveToJson(records: MessageRecord[], credit?: ExportCredit): string {
  return JSON.stringify({
    exportedWith: credit ? `${credit.text} (${credit.url})` : undefined,
    exportedAt: new Date().toISOString(),
    count: records.length,
    messages: records,
  }, null, 2);
}

export function archiveToCsv(records: MessageRecord[]): string {
  const header = ['id', 'timestamp', 'where', 'channel_id', 'guild_id', 'author', 'content', 'attachments', 'status'];
  const rows = records.map(r => [
    r.id, r.timestamp, r.where, r.channelId, r.guildId ?? '', r.author, r.content,
    r.attachments.map(a => a.url).join(' '), r.status,
  ].map(csvCell).join(','));
  // BOM so Excel opens accents correctly.
  return `﻿${header.join(',')}\n${rows.join('\n')}`;
}

export function archiveToHtml(records: MessageRecord[], title: string, credit?: ExportCredit): string {
  const groups = new Map<string, MessageRecord[]>();
  for (const r of records) {
    const list = groups.get(r.where) ?? [];
    list.push(r);
    groups.set(r.where, list);
  }
  const sections = [...groups].map(([where, list]) => {
    const items = [...list]
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      .map(r => {
        const atts = r.attachments
          .map(a => `<a href="${escapeHtml(a.url)}" target="_blank" rel="noopener">📎 ${escapeHtml(a.filename)}</a>`)
          .join(' ');
        return `<div class="msg"><time>${escapeHtml(new Date(r.timestamp).toLocaleString())}</time>`
          + (r.author ? `<b>${escapeHtml(r.author)}</b>` : '')
          + `<p>${escapeHtml(r.content).replace(/\n/g, '<br>') || '<i>(vide)</i>'}</p>${atts ? `<div class="att">${atts}</div>` : ''}</div>`;
      }).join('\n');
    return `<section><h2>${escapeHtml(where)} <small>${list.length}</small></h2>${items}</section>`;
  }).join('\n');

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><style>
body{margin:0;background:#1e1f22;color:#dbdee1;font:15px/1.45 system-ui,sans-serif}
main{max-width:860px;margin:0 auto;padding:24px 16px}h1{color:#fff;font-size:22px}
h2{color:#fff;font-size:16px;margin:28px 0 8px;border-bottom:1px solid #3f4147;padding-bottom:6px}
small{color:#949ba4;font-weight:400}.msg{padding:8px 12px;border-radius:8px}.msg:hover{background:#2b2d31}
time{color:#949ba4;font-size:12px;margin-right:8px}b{color:#fff}p{margin:2px 0;white-space:pre-wrap;word-wrap:break-word}
a{color:#00a8fc}.att{font-size:13px}footer{margin-top:40px;padding-top:14px;border-top:1px solid #3f4147;color:#949ba4;font-size:13px}
</style></head><body><main><h1>${escapeHtml(title)}</h1><p>${records.length} messages · ${escapeHtml(new Date().toLocaleString())}</p>
${sections}${credit ? `<footer>Export : <a href="${escapeHtml(credit.url)}" target="_blank" rel="noopener">${escapeHtml(credit.text)}</a></footer>` : ''}</main></body></html>`;
}
