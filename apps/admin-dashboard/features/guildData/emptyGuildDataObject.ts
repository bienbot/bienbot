import { GuildData } from "@bienbot/types";

export const emptyGuildData: GuildData = {
    serverInfo: {
        name: "",
        id: "",
        allUsers: [],
        onlineUsers: [],
    },
    data: {
        messages: {},
        voicePresence: {},
        events: {},
    },
    config: {
        reportChannelId: "",
    },
    users: {},
};
