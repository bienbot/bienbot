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

export interface MessageData {
    author: {
        id: string;
    };
    content: string;
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
    };
    messages: Record<string, MessageData[]>;
    users: Record<string, UserData>;
    channelStats: ChannelVoiceData;
    events: {
        messageDelete: EventData[];
    };
}
