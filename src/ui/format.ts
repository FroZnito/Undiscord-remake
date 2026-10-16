import type { PackageChannel } from '../core/datapackage';
import type { DiscordChannel, DiscordGuild, DiscordUser } from '../core/types';
import { currentLang, t } from '../i18n';
import type { ChannelInfo } from './state';

const CDN = 'https://cdn.discordapp.com';

export function avatarUrl(user: DiscordUser | undefined | null): string | null {
  if (!user) return null;
  if (user.avatar) return `${CDN}/avatars/${user.id}/${user.avatar}.webp?size=64`;
  try {
    return `${CDN}/embed/avatars/${Number((BigInt(user.id) >> 22n) % 6n)}.png`;
  } catch {
    return null;
  }
}

export const guildIconUrl = (g: DiscordGuild | null | undefined) =>
  g?.icon ? `${CDN}/icons/${g.id}/${g.icon}.webp?size=64` : null;

export const userName = (u: DiscordUser | undefined | null) => u?.global_name || u?.username || '?';

export function describeChannel(ch: DiscordChannel): ChannelInfo {
  if (ch.type === 1) {
    const other = ch.recipients?.[0];
    return { kind: 'dm', name: userName(other), iconUrl: avatarUrl(other) };
  }
  if (ch.type === 3) {
    const name = ch.name || (ch.recipients ?? []).map(userName).join(', ') || ch.id;
    return {
      kind: 'group',
      name,
      iconUrl: ch.icon ? `${CDN}/channel-icons/${ch.id}/${ch.icon}.webp?size=64` : null,
    };
  }
  return { kind: 'guild', name: `#${ch.name ?? ch.id}`, iconUrl: null };
}

export function channelLabel(info: ChannelInfo, guildName?: string | null): string {
  if (info.kind === 'dm') return t('target.dm', { name: info.name });
  if (info.kind === 'group') return t('target.group', { name: info.name });
  return guildName ? `${info.name} — ${guildName}` : info.name;
}

export function packageChannelLabel(ch: PackageChannel): string {
  if (ch.kind === 'guild' && ch.guildName && !ch.name.includes(ch.guildName)) return `${ch.name} — ${ch.guildName}`;
  return ch.name;
}

export const initials = (name: string) =>
  name.replace(/^#/, '').split(/\s+/).filter(Boolean).slice(0, 2).map(w => [...w][0]?.toUpperCase() ?? '').join('') || '?';

export const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export const formatDate = (iso: string | number | Date) =>
  new Date(iso).toLocaleString(currentLang.value, { dateStyle: 'short', timeStyle: 'short' });

export const formatDay = (iso: string | number | Date) =>
  new Date(iso).toLocaleDateString(currentLang.value, { dateStyle: 'medium' });

/** `datetime-local` input value for "now minus `days`". */
export function daysAgoLocal(days: number): string {
  const d = new Date(Date.now() - days * 86_400_000);
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
