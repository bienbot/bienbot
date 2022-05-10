export function types(): string {
    return "types";
}

export interface UserData {
    avatar: string;
    bot: boolean;
    createdAt: number;
    discriminator: string;
    displayColor: string;
    displayName: string;
    id: string;
    joinedAt: Date;
    roles: string[];
    username: string;
    presence: "online" | "idle" | "dnd" | "offline" | "invisible";
    boostingSince: Timestamp;
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
    author: {
        id: string;
        discriminator: string;
        displayName: string;
        username: string;
        avatar: string;
        href?: string;
    };
    content: {
        text: string;
        attachments: Attachment[];
        href?: string;
    };
    channel: {
        id: string;
        name: string;
        href?: string;
    };
    timestamp: Timestamp;
    id: string;
    history?: { content: string; attachments: Attachment[] }[];
}

export type Timestamp = {
    seconds: number;
    nanoseconds: number;
};

export type VoiceChannelStats = Record<string, Timestamp[]>;

export type ChannelVoiceData = Record<string, VoiceChannelStats>;

export type EventData = {
    user: {
        imageSrc: string;
        displayName: string;
        discordTag: string;
        id: string;
        href?: string;
    };
    event: {
        type: string;
        target: string;
        targetId: string;
        description: string;
        timestamp: Timestamp;
        targetHref?: string;
    };
};

export interface GuildData {
    data: {
        allUsers: string[];
        onlineUsers: string[];
        name: string;
        id: string;
    };
    messages: Record<string, MessageData[]>;
    users: Record<string, UserData>;
    channelStats: ChannelVoiceData;
    events: {
        messageDelete: EventData[];
    };
}
