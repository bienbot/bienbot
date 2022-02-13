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

export interface VoiceChannelStats {
    [key: string]: Date[];
}
