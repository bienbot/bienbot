import { GuildData, MessageData } from "@bienbot/types";

const getGuildMessages = (guildData: GuildData): MessageData[] => {
    let guildMessages = [];

    Object.keys(guildData.messages).forEach((channel) => {
        const channelMessages = guildData.messages[channel];
        guildMessages.push(channelMessages);
    });

    guildMessages = guildMessages.flat();
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
