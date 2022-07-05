import { GuildData, MessageData } from "@bienbot/types";

const mockMessages: MessageData[] = Array.from({ length: 10 }, (_, i) => {
    const message: MessageData = {
        content: `Message ${i}`,
        channel: "channelId_0",
        timestamp: "2020-01-01T00:00:00.000Z",
        id: `messageId_${i}`,
        attachments: [],
        deleted: false,
        author: "memberId_0-guildId",
        history: [],
        guild: "guildId",
    };
    return message;
});

const mockGuildData: GuildData = {
    id: "guildId",
    name: "Test Guild",
    messages: mockMessages,
    members: [
        {
            avatar: "https://picsum.photos/200/200",
            bot: false,
            createdAt: 0,
            discriminator: "7777",
            displayColor: "000000",
            displayName: "testUserDisplayName",
            id: "memberId_0",
            joinedAt: "2020-01-01T00:00:00.000Z",
            roles: [],
            username: "testUserName",
            presence: "online",
            boostingSince: "2020-01-01T00:00:00.000Z",
        },
    ],
    channels: [
        {
            id: "channelId",
            name: "channelName",
            type: "GUILD_TEXT",
            guild: "guildId",
        },
    ],
    voicePresences: [
        {
            channelId: "channelId",
            timestamp: "2020-01-01T00:00:00.000Z",
            member: "memberId-guildId",
        },
    ],
    events: [
        {
            id: 1,
            description: "eventDescription",
            target: "eventTarget",
            targetId: "eventTargetId",
            timestamp: "2020-01-01T00:00:00.000Z",
            type: "messageDelete",
            member: "memberId-guildId",
            guild: "guildId",
        },
    ],
    roles: [],
};

export { mockGuildData };
