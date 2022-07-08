export interface MemberData {
    avatar: string;
    bot: boolean;
    createdAt: number;
    discriminator: string;
    displayColor: string;
    displayName: string;
    id: string;
    joinedAt: string;
    roles: string[];
    username: string;
    presence: "online" | "idle" | "dnd" | "offline" | "invisible";
    boostingSince: string;
}

export type Attachment = {
    attachment: string;
    contentType: string;
    description: string | null;
    name: string;
    proxyURL: string;
    url: string;
    text: string;
    width?: number;
    height?: number;
};

export interface MessageData {
    content: string;
    channel: string;
    timestamp: string;
    id: string;
    attachments?: any[];
    deleted: boolean;
    author: `${string}-${string}`;
    history: [];
    guild: string;
}

export interface ChannelData {
    id: string;
    name: string;
    type: "GUILD_TEXT" | "GUILD_VOICE";
    guild: string;
}

export type VoicePresenceData = {
    channelId: string;
    timestamp: string;
    member: `${string}-${string}`;
};

export type EventData = {
    id: number;
    description: string;
    target: string;
    targetId: string;
    timestamp: string;
    type: "messageDelete";
    member: string;
    guild: string;
};

export type RoleData = {
    id: string;
    icon: string;
    unicodeEmoji: string;
    name: string;
    color: string;
    permissions: string;
};

export interface GuildData {
    id: string;
    name: string;
    messages: MessageData[];
    members: MemberData[];
    channels: ChannelData[];
    voicePresences: VoicePresenceData[];
    events: EventData[];
    roles: RoleData[];
    accessRole?: string;
}
