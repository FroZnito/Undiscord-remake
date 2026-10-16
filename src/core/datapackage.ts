import { strFromU8, unzipSync } from 'fflate';
import { isSnowflake } from './snowflake';
import type { PackageMessage } from './types';

/**
 * Parser for the "Request my data" package Discord sends by email.
 * Handles both layouts seen in the wild:
 *   messages/<id>/channel.json + messages.csv            (older)
 *   Messages/c<id>/channel.json + messages.json          (current)
 * plus messages/index.json which maps channel ids to readable names.
 */

export type PackageChannelKind = 'dm' | 'group' | 'guild' | 'unknown';

export interface PackageChannel {
  id: string;
  kind: PackageChannelKind;
  name: string;
  guildId: string | null;
  guildName: string | null;
  messages: PackageMessage[];
}

export interface ParsedPackage {
  channels: PackageChannel[];
  totalMessages: number;
}

/** Discord writes 64-bit ids as bare JSON numbers in some files; quote them before JSON.parse. */
export const quoteBigIds = (text: string) =>
  text.replace(/("(?:id|ID|Id|channel_id|guild_id)"\s*:\s*)(\d{15,})/g, '$1"$2"');

const stripBom = (s: string) => (s.charCodeAt(0) === 0xfeff ? s.slice(1) : s);

function parseJson(text: string): any {
  try {
    return JSON.parse(quoteBigIds(stripBom(text)));
  } catch {
    return null;
  }
}

export function parseCsv(text: string): string[][] {
  const src = stripBom(text);
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function lowerKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[k.toLowerCase()] = v;
  return out;
}

function toMessage(raw: Record<string, unknown>): PackageMessage | null {
  const r = lowerKeys(raw);
  const id = String(r.id ?? '');
  if (!isSnowflake(id)) return null;
  return {
    id,
    timestamp: r.timestamp ? String(r.timestamp) : undefined,
    content: r.contents != null ? String(r.contents) : r.content != null ? String(r.content) : '',
    attachments: r.attachments ? String(r.attachments) : '',
  };
}

export function parseMessagesJson(text: string): PackageMessage[] {
  const data = parseJson(text);
  if (!Array.isArray(data)) return [];
  return data.map(m => (m && typeof m === 'object' ? toMessage(m) : null)).filter((m): m is PackageMessage => !!m);
}

export function parseMessagesCsv(text: string): PackageMessage[] {
  const rows = parseCsv(text).filter(r => r.length > 1 || r[0]);
  if (!rows.length) return [];
  const header = rows[0].map(h => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const [idCol, tsCol, contentCol, attCol] = [col('id'), col('timestamp'), col('contents'), col('attachments')];
  if (idCol < 0) return [];
  return rows.slice(1).map(r => toMessage({
    id: r[idCol],
    timestamp: tsCol >= 0 ? r[tsCol] : undefined,
    contents: contentCol >= 0 ? r[contentCol] : '',
    attachments: attCol >= 0 ? r[attCol] : '',
  })).filter((m): m is PackageMessage => !!m);
}

function channelKind(info: any): PackageChannelKind {
  if (!info) return 'unknown';
  if (info.guild) return 'guild';
  const t = info.type;
  if (t === 1 || t === 'DM') return 'dm';
  if (t === 3 || t === 'GROUP_DM') return 'group';
  if (typeof t === 'number' || typeof t === 'string') return 'guild';
  return 'unknown';
}

const CHANNEL_FILE_RE = /(?:^|\/)messages\/c?(\d{15,21})\/(channel\.json|messages\.json|messages\.csv)$/i;
const INDEX_RE = /(?:^|\/)messages\/index\.json$/i;

/** `files` maps archive paths to their text content. */
export function parsePackageFiles(files: Map<string, string>): ParsedPackage {
  let index: Record<string, string | null> = {};
  const byId = new Map<string, { info?: any; messages: PackageMessage[] }>();
  const entry = (id: string) => {
    let e = byId.get(id);
    if (!e) byId.set(id, (e = { messages: [] }));
    return e;
  };

  for (const [rawPath, text] of files) {
    const path = rawPath.replace(/\\/g, '/');
    if (INDEX_RE.test(path)) {
      index = parseJson(text) ?? {};
      continue;
    }
    const m = CHANNEL_FILE_RE.exec(path);
    if (!m) continue;
    const [, id, file] = m;
    const e = entry(id);
    const lower = file.toLowerCase();
    if (lower === 'channel.json') e.info = parseJson(text);
    else if (lower === 'messages.json') e.messages.push(...parseMessagesJson(text));
    else e.messages.push(...parseMessagesCsv(text));
  }

  // Channels listed in index.json but without a folder still count (legacy "index only" import).
  for (const id of Object.keys(index)) if (isSnowflake(id)) entry(id);

  const channels: PackageChannel[] = [];
  for (const [id, e] of byId) {
    const info = e.info;
    const indexName = index[id];
    const kind = channelKind(info);
    channels.push({
      id,
      kind,
      name: (indexName && indexName !== 'None' ? indexName : '') || info?.name || id,
      guildId: info?.guild?.id ? String(info.guild.id) : null,
      guildName: info?.guild?.name ?? null,
      messages: dedupe(e.messages),
    });
  }
  channels.sort((a, b) => b.messages.length - a.messages.length);
  return { channels, totalMessages: channels.reduce((n, c) => n + c.messages.length, 0) };
}

function dedupe(messages: PackageMessage[]): PackageMessage[] {
  const seen = new Set<string>();
  return messages.filter(m => (seen.has(m.id) ? false : (seen.add(m.id), true)));
}

const WANTED_RE = /(?:^|\/)messages\/.*\.(json|csv)$/i;

export function parsePackageZip(data: Uint8Array): ParsedPackage {
  // Only inflate the message files; the rest of the archive can be large.
  const files = unzipSync(data, { filter: f => WANTED_RE.test(f.name) });
  const map = new Map<string, string>();
  for (const [name, bytes] of Object.entries(files)) map.set(name, strFromU8(bytes));
  return parsePackageFiles(map);
}

/** Accepts a .zip, a single index.json, or files picked from the extracted folder. */
export async function parsePackageInput(files: File[]): Promise<ParsedPackage> {
  if (files.length === 1 && /\.zip$/i.test(files[0].name)) {
    return parsePackageZip(new Uint8Array(await files[0].arrayBuffer()));
  }
  const map = new Map<string, string>();
  for (const f of files) {
    const path = (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name;
    const normalised = /index\.json$/i.test(path) && !/messages\//i.test(path) ? `messages/${path}` : path;
    if (WANTED_RE.test(normalised)) map.set(normalised, await f.text());
  }
  return parsePackageFiles(map);
}
