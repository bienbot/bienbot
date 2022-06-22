import { GuildData, MessageData } from "@bienbot/types";

const getGuildMessages = (guildData: GuildData): MessageData[] => {
    const guildMessages = Object.values(guildData.data.messages);

    guildMessages.sort((a, b) => {
        return (
            b.timestamp.seconds +
            b.timestamp.nanoseconds / 1000000000 -
            (a.timestamp.seconds + a.timestamp.nanoseconds / 1000000000)
        );
    });
    return guildMessages;
};

export { getGuildMessages };
