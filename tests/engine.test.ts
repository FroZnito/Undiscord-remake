import { describe, expect, it } from 'vitest';
import { createFakeDiscord, type FakeOptions } from '../dev/fakeDiscord';
import { DiscordApi } from '../src/core/api';
import { createJob, WipeEngine, type EngineOptions, type JobTarget } from '../src/core/engine';
import { defaultFilter } from '../src/core/filters';
import type { MessageRecord } from '../src/core/types';

const GUILD = '200000000000000001';
const GENERAL = '300000000000000001';
const MEMES = '300000000000000002';
const DM_ALICE = '300000000000000010';
const GROUP = '300000000000000012';

/** Instant sleep that still honours abort signals. */
const instantSleep = (_ms: number, signal?: AbortSignal) =>
  signal?.aborted ? Promise.reject(Object.assign(new Error('Aborted'), { name: 'AbortError' })) : Promise.resolve();

function setup(fakeOpts: FakeOptions = {}) {
  const fake = createFakeDiscord(fakeOpts);
  const api = new DiscordApi({ getToken: () => fake.token, fetch: fake.fetch as typeof fetch, sleep: instantSleep });
  const logs: string[] = [];
  const records: MessageRecord[] = [];
  const engine = new WipeEngine(api, {
    onLog: (level, key) => logs.push(`${level}:${key}`),
    onMessage: r => records.push(r),
  }, { sleep: instantSleep });
  const options = (over: Partial<EngineOptions> = {}): EngineOptions => ({
    filter: { ...defaultFilter(), authorIds: [fake.me.id] },
    mode: 'search',
    dryRun: false,
    searchDelay: 10,
    deleteDelay: 10,
    adaptive: true,
    maxAttempts: 3,
    emptyPageRetries: 3,
    ...over,
  });
  let n = 0;
  const jobs = (...targets: JobTarget[]) => targets.map(t => createJob(t, `job-${n++}`));
  return { fake, api, engine, logs, records, options, jobs };
}

const channel = (channelId: string, guildId: string | null = GUILD): JobTarget =>
  ({ kind: 'channel', guildId, channelId, label: channelId });

describe('WipeEngine — search mode', () => {
  it('deletes every own message in a channel and leaves pinned + others alone', async () => {
    const { fake, engine, options, jobs } = setup();
    fake.seed(GENERAL, 120);
    await engine.run(jobs(channel(GENERAL)), options());
    // 60 own messages, one of them pinned (index 3 → author index 1 = alice, so none pinned are mine)
    expect(fake.remaining(GENERAL)).toBe(0);
    expect(engine.stats.deleted).toBe(60);
    expect(fake.remaining(GENERAL, '100000000000000002')).toBe(60);
  });

  it('survives a lagging search index, 202 indexing, rate limits and empty pages', async () => {
    const { fake, engine, options, jobs, logs } = setup({ indexLag: 3, indexingFor: 2, rateLimitEvery: 7, emptyPageEvery: 4 });
    fake.seed(GENERAL, 200, [fake.state.me]);
    await engine.run(jobs(channel(GENERAL)), options());
    const pinned = fake.state.messages.get(GENERAL)!.filter(m => m.pinned).length;
    expect(fake.remaining(GENERAL)).toBe(pinned);
    expect(engine.stats.deleted).toBe(200 - pinned);
    expect(engine.stats.failed).toBe(0);
    expect(logs).toContain('warn:log.rateLimited');
    expect(logs).toContain('info:log.indexing');
  });

  it('wipes a whole guild in one job', async () => {
    const { fake, engine, options, jobs } = setup();
    fake.seed(GENERAL, 40);
    fake.seed(MEMES, 40);
    await engine.run(jobs({ kind: 'guild', guildId: GUILD, label: 'guild' }), options());
    expect(fake.remaining(GENERAL) + fake.remaining(MEMES)).toBe(0);
    expect(engine.stats.deleted).toBe(40);
  });

  it('respects text and date filters', async () => {
    const { fake, engine, options, jobs } = setup();
    fake.seed(GENERAL, 48, [fake.state.me]);
    const all = fake.state.messages.get(GENERAL)!;
    const cutoff = all[30].timestamp.slice(0, 16); // datetime-local precision
    const expected = all.filter(m => m.content.includes('bonne') && !m.pinned && m.timestamp.slice(0, 16) > cutoff).length;
    expect(expected).toBeGreaterThan(0);
    await engine.run(jobs(channel(GENERAL)), options({
      filter: { ...defaultFilter(), authorIds: [fake.me.id], content: 'bonne', afterDate: `${cutoff}Z` },
    }));
    expect(engine.stats.deleted).toBe(expected);
    expect(fake.remaining(GENERAL)).toBe(48 - expected);
  });

  it('preview mode finds messages without deleting anything', async () => {
    const { fake, engine, options, jobs, records } = setup();
    fake.seed(DM_ALICE, 30);
    await engine.run(jobs(channel(DM_ALICE, '@me')), options({ dryRun: true }));
    expect(fake.state.deleted.size).toBe(0);
    expect(engine.stats.matched).toBe(15);
    expect(records.every(r => r.status === 'matched')).toBe(true);
  });

  it('skips undeletable system messages in group DMs', async () => {
    const { fake, engine, options, jobs } = setup();
    fake.seed(GROUP, 10, [fake.state.me]);
    await engine.run(jobs(channel(GROUP, '@me')), options({ filter: { ...defaultFilter(), authorIds: [fake.me.id], pinned: 'include' } }));
    expect(fake.remaining(GROUP)).toBe(1); // the type 1 system message
    expect(engine.stats.failed).toBe(0);
  });

  it('stops cleanly and can resume from the saved cursor', async () => {
    const { fake, engine, options, jobs } = setup();
    fake.seed(GENERAL, 100, [fake.state.me]);
    const list = jobs(channel(GENERAL));
    let count = 0;
    const api2 = engine as unknown as { events: { onMessage: () => void } };
    api2.events.onMessage = () => {
      if (++count === 30) engine.stop();
    };
    await engine.run(list, options());
    expect(list[0].status).toBe('stopped');
    expect(fake.state.deleted.size).toBe(30);
    expect(list[0].cursor).toBeTruthy();

    list[0].status = 'pending';
    api2.events.onMessage = () => {};
    await engine.run(list, options());
    expect(list[0].status).toBe('done');
    expect(fake.remaining(GENERAL)).toBe(1); // the pinned one
  });
});

describe('WipeEngine — other modes', () => {
  it('history mode reads the whole channel', async () => {
    const { fake, engine, options, jobs } = setup();
    fake.seed(GENERAL, 250);
    await engine.run(jobs(channel(GENERAL)), options({ mode: 'history' }));
    expect(fake.remaining(GENERAL)).toBe(0);
    expect(engine.stats.deleted).toBe(125);
  });

  it('ids mode deletes package messages and honours pins', async () => {
    const { fake, engine, options, jobs } = setup();
    fake.seed(DM_ALICE, 20, [fake.state.me]);
    const messages = fake.state.messages.get(DM_ALICE)!.map(m => ({ id: m.id, content: m.content }));
    await engine.run(jobs({ kind: 'ids', guildId: '@me', channelId: DM_ALICE, label: 'dm', messages, checkPins: true }), options());
    expect(fake.remaining(DM_ALICE)).toBe(1);
    expect(engine.stats.deleted).toBe(19);
  });

  it('skips channels that became inaccessible', async () => {
    const { fake, engine, options, jobs, logs } = setup();
    fake.seed(GENERAL, 10, [fake.state.me]);
    fake.seed(MEMES, 10, [fake.state.me]);
    fake.state.forbiddenChannels.add(GENERAL);
    const ids = (c: string) => fake.state.messages.get(c)!.map(m => ({ id: m.id }));
    const list = jobs(
      { kind: 'ids', guildId: GUILD, channelId: GENERAL, label: 'forbidden', messages: ids(GENERAL) },
      { kind: 'ids', guildId: GUILD, channelId: MEMES, label: 'ok', messages: ids(MEMES) },
    );
    await engine.run(list, options());
    expect(list[0].status).toBe('skipped');
    expect(list[1].status).toBe('done');
    expect(fake.remaining(MEMES)).toBe(0);
    expect(logs).toContain('warn:log.jobInaccessible');
  });

  it('aborts everything on an invalid token', async () => {
    const fake = createFakeDiscord();
    fake.seed(GENERAL, 10);
    const api = new DiscordApi({ getToken: () => 'wrong', fetch: fake.fetch as typeof fetch, sleep: instantSleep });
    const logs: string[] = [];
    const engine = new WipeEngine(api, { onLog: (l, k) => logs.push(`${l}:${k}`) }, { sleep: instantSleep });
    const list = [createJob(channel(GENERAL), 'a'), createJob(channel(MEMES), 'b')];
    await engine.run(list, { ...setup().options(), filter: defaultFilter() });
    expect(logs).toContain('error:log.unauthorized');
    expect(list[1].status).toBe('pending');
  });
});
