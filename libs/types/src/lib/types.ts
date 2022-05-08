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
}

export type Attachment = {
    attachment: string;
    contentType: string;
    description: string | null;
    name: string;
    proxyURL: string;
    url: string;
    text: string;
};

export interface MessageData {
    author: {
        id: string;
    };
    content: {
        text: string;
        attachments: Attachment[];
    };
    timestamp: Date;
}

export type Timestamp = {
    seconds: number;
    nanoseconds: number;
};

export type VoiceChannelStats = Record<string, Timestamp[]>;

export type ChannelVoiceData = Record<string, VoiceChannelStats>;

export type EventData = {
    imageSrc: string;
    displayName: string;
    discordTag: string;
    description: string;
    target: string;
    targetHref?: string;
    time: Timestamp;
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
