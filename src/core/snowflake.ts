/**
 * Snowflake helpers. Discord ids are 64-bit integers, so everything goes
 * through BigInt: plain numbers silently lose precision above 2^53.
 */

export const DISCORD_EPOCH = 1420070400000n;

export function isSnowflake(value: unknown): value is string {
  return typeof value === 'string' && /^\d{15,21}$/.test(value);
}

export function dateToSnowflake(date: Date | number | string): string {
  const ms = BigInt(new Date(date).getTime());
  if (ms < DISCORD_EPOCH) return '0';
  return ((ms - DISCORD_EPOCH) << 22n).toString();
}

export function snowflakeToDate(id: string): Date {
  return new Date(Number((BigInt(id) >> 22n) + DISCORD_EPOCH));
}

export function compareSnowflakes(a: string, b: string): number {
  const x = BigInt(a);
  const y = BigInt(b);
  return x < y ? -1 : x > y ? 1 : 0;
}

export function minSnowflake(ids: string[]): string {
  return ids.reduce((min, id) => (compareSnowflakes(id, min) < 0 ? id : min));
}

export function maxSnowflake(ids: string[]): string {
  return ids.reduce((max, id) => (compareSnowflakes(id, max) > 0 ? id : max));
}

/** Sorts ids (or objects with an id) from newest to oldest. */
export function sortNewestFirst<T extends { id: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => compareSnowflakes(b.id, a.id));
}
