import { GuildData } from "@bienbot/types";

const getUserMessages = (guildData: GuildData, userId: string) => {
    const userMessages = [];

    Object.keys(guildData.messages).forEach((channel) => {
        const channelMessages = guildData.messages[channel];
        userMessages.push(
            channelMessages.filter((message) => message.author.id === userId)
        );
    });

    console.log(userMessages.flat());
    return userMessages.flat();
};

export { getUserMessages };
