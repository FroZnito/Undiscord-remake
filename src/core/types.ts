/** Minimal subset of the Discord API objects we rely on. */

export interface DiscordUser {
  id: string;
  username: string;
  global_name?: string | null;
  discriminator?: string;
  avatar?: string | null;
  bot?: boolean;
}

export interface DiscordAttachment {
  id: string;
  filename: string;
  url: string;
  size?: number;
  content_type?: string;
}

export interface DiscordEmbed {
  type?: string;
  url?: string;
}

export interface DiscordMessage {
  id: string;
  channel_id: string;
  guild_id?: string;
  author: DiscordUser;
  content: string;
  timestamp: string;
  edited_timestamp?: string | null;
  attachments: DiscordAttachment[];
  embeds: DiscordEmbed[];
  sticker_items?: { id: string; name: string }[];
  poll?: unknown;
  pinned: boolean;
  type: number;
  /** Present on search results: marks the message that matched the query. */
  hit?: boolean;
}

export interface SearchResponse {
  total_results: number;
  messages: DiscordMessage[][];
  doing_deep_historical_index?: boolean;
  documents_indexed?: number;
  /** Threads that appear in the results (lets us find their parent channel). */
  threads?: DiscordChannel[];
}

export const ChannelType = {
  GUILD_TEXT: 0,
  DM: 1,
  GUILD_VOICE: 2,
  GROUP_DM: 3,
  GUILD_CATEGORY: 4,
  GUILD_ANNOUNCEMENT: 5,
  ANNOUNCEMENT_THREAD: 10,
  PUBLIC_THREAD: 11,
  PRIVATE_THREAD: 12,
  GUILD_STAGE_VOICE: 13,
  GUILD_FORUM: 15,
  GUILD_MEDIA: 16,
} as const;

export interface DiscordChannel {
  id: string;
  type: number;
  name?: string | null;
  guild_id?: string;
  recipients?: DiscordUser[];
  icon?: string | null;
  last_message_id?: string | null;
  nsfw?: boolean;
  parent_id?: string | null;
  position?: number;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon?: string | null;
}

/** A message as known from a Discord data package (no author/pinned info). */
export interface PackageMessage {
  id: string;
  timestamp?: string;
  content?: string;
  attachments?: string;
}

/** Normalised message record kept for archives / previews. */
export interface MessageRecord {
  id: string;
  channelId: string;
  guildId: string | null;
  where: string;
  author: string;
  content: string;
  timestamp: string;
  attachments: { filename: string; url: string }[];
  status: 'deleted' | 'matched';
}
