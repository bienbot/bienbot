import { GuildData } from "@bienbot/types";

const getGuildMessages = (guildData: GuildData) => {
    let guildMessages = [];

    Object.keys(guildData.messages).forEach((channel) => {
        const channelMessages = guildData.messages[channel];
        guildMessages.push(channelMessages);
    });

    guildMessages = guildMessages.flat();
    guildMessages.sort((a, b) => {
        return b.timestamp.seconds - a.timestamp.seconds;
    });
    return guildMessages;
};

export { getGuildMessages };
