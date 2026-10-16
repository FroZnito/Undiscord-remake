import { describe, expect, it } from 'vitest';
import { compareSnowflakes, dateToSnowflake, snowflakeToDate } from '../src/core/snowflake';
import {
  buildSearchQuery, compileRegex, computeBounds, createMatcher, createPackageMatcher, defaultFilter,
} from '../src/core/filters';
import { parseCsv, parsePackageFiles, quoteBigIds } from '../src/core/datapackage';
import { routeKey } from '../src/core/api';
import { extractHits } from '../src/core/engine';
import type { DiscordMessage } from '../src/core/types';

const msg = (over: Partial<DiscordMessage> = {}): DiscordMessage => ({
  id: '1100000000000000000',
  channel_id: '1',
  author: { id: 'me', username: 'me' },
  content: 'Hello World',
  timestamp: '2023-01-01T00:00:00.000Z',
  attachments: [],
  embeds: [],
  pinned: false,
  type: 0,
  ...over,
});

describe('snowflake', () => {
  it('round-trips dates without precision loss', () => {
    const d = new Date('2024-05-17T10:20:30.456Z');
    const id = dateToSnowflake(d);
    expect(snowflakeToDate(id).toISOString()).toBe(d.toISOString());
  });

  it('decodes a real snowflake', () => {
    expect(snowflakeToDate('175928847299117063').toISOString()).toBe('2016-04-30T11:18:25.796Z');
  });

  it('compares 64-bit ids exactly', () => {
    expect(compareSnowflakes('1234567890123456789', '1234567890123456788')).toBe(1);
  });
});

describe('filters', () => {
  it('computes the tightest bounds from ids and dates', () => {
    const f = { ...defaultFilter(), afterId: '1000000000000000000', afterDate: '2024-01-01T00:00' };
    const b = computeBounds(f);
    expect(compareSnowflakes(b.minId!, '1000000000000000000')).toBe(1);
    expect(b.maxId).toBeUndefined();
  });

  it('parses regex literals and reports errors', () => {
    expect(compileRegex('/foo/i').regex?.flags).toBe('i');
    expect(compileRegex('foo').regex?.test('FOO')).toBe(true);
    expect(compileRegex('(').error).toBeTruthy();
  });

  it('skips system messages, pinned ones and other authors', () => {
    const match = createMatcher({ ...defaultFilter(), authorIds: ['me'] }, { serverFiltered: true });
    expect(match(msg())).toBeNull();
    expect(match(msg({ type: 3 }))).toBe('system');
    expect(match(msg({ pinned: true }))).toBe('pinned');
    expect(match(msg({ author: { id: 'other', username: 'x' } }))).toBe('author');
  });

  it('applies content/has locally only when the server did not', () => {
    const f = { ...defaultFilter(), content: 'wörld', has: ['file' as const] };
    expect(createMatcher(f, { serverFiltered: true })(msg())).toBeNull();
    expect(createMatcher(f, { serverFiltered: false })(msg())).toBe('has');
    const withFile = msg({ content: 'hello world', attachments: [{ id: '1', filename: 'a.png', url: 'u' }] });
    expect(createMatcher(f, { serverFiltered: false })(withFile)).toBeNull();
  });

  it('never deletes package messages it cannot verify', () => {
    const match = createPackageMatcher({ ...defaultFilter(), has: ['sticker'] });
    expect(match({ id: '1100000000000000000', content: 'x' })).toBe('unverifiable');
  });

  it('builds the search query', () => {
    const q = buildSearchQuery({ ...defaultFilter(), authorIds: ['me'], has: ['link'], pinned: 'only' }, { maxId: '5' }, 'c1');
    expect(q).toContainEqual(['author_id', 'me']);
    expect(q).toContainEqual(['channel_id', 'c1']);
    expect(q).toContainEqual(['pinned', 'true']);
    expect(q).toContainEqual(['max_id', '5']);
  });
});

describe('api helpers', () => {
  it('keeps only the major parameter in route keys', () => {
    expect(routeKey('DELETE', '/channels/111111111111111111/messages/222222222222222222'))
      .toBe('DELETE /channels/111111111111111111/messages/:id');
  });

  it('extracts hits from grouped search results', () => {
    const a = msg({ id: '1' });
    const b = msg({ id: '2', hit: true });
    expect(extractHits({ total_results: 2, messages: [[a], [msg({ id: '0' }), b, msg({ id: '3' })]] }).map(m => m.id))
      .toEqual(['1', '2']);
  });
});

describe('data package', () => {
  it('quotes bare 64-bit ids', () => {
    const parsed = JSON.parse(quoteBigIds('[{"ID": 1234567890123456789, "Contents": "x"}]'));
    expect(parsed[0].ID).toBe('1234567890123456789');
  });

  it('parses quoted, multi-line CSV', () => {
    expect(parseCsv('a,b\n1,"x\n""y"""\n')).toEqual([['a', 'b'], ['1', 'x\n"y"']]);
  });

  it('reads both package layouts', () => {
    const files = new Map<string, string>([
      ['package/messages/index.json', '{"111111111111111111": "Direct Message with alice#0", "222222222222222222": "général in Le Repaire"}'],
      ['package/messages/111111111111111111/channel.json', '{"id": "111111111111111111", "type": 1}'],
      ['package/messages/111111111111111111/messages.csv',
        'ID,Timestamp,Contents,Attachments\n1100000000000000001,2023-01-01 00:00:00,"hey, you",\n'],
      ['package/Messages/c222222222222222222/channel.json',
        '{"id": "222222222222222222", "type": 0, "guild": {"id": "333333333333333333", "name": "Le Repaire"}}'],
      ['package/Messages/c222222222222222222/messages.json',
        '[{"ID": 1100000000000000002, "Timestamp": "2023-01-01 00:00:00", "Contents": "a", "Attachments": ""},'
        + '{"ID": 1100000000000000003, "Timestamp": "2023-01-02 00:00:00", "Contents": "b", "Attachments": "https://cdn/x.png"}]'],
    ]);
    const pkg = parsePackageFiles(files);
    expect(pkg.totalMessages).toBe(3);
    const guild = pkg.channels.find(c => c.id === '222222222222222222')!;
    expect(guild.kind).toBe('guild');
    expect(guild.guildId).toBe('333333333333333333');
    expect(guild.messages[0].id).toBe('1100000000000000002');
    const dm = pkg.channels.find(c => c.id === '111111111111111111')!;
    expect(dm.kind).toBe('dm');
    expect(dm.name).toBe('Direct Message with alice#0');
    expect(dm.messages[0].content).toBe('hey, you');
  });
});
