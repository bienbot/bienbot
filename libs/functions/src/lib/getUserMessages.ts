import { GuildData } from "@bienbot/types";

const getUserMessages = (guildData: GuildData, userId: string) => {
    let userMessages = [];

    Object.keys(guildData.messages).forEach((channel) => {
        const channelMessages = guildData.messages[channel];
        userMessages.push(
            channelMessages.filter((message) => message.author.id === userId)
        );
    });

    userMessages = userMessages.flat();
    userMessages.sort((a, b) => {
        return (
            b.timestamp.seconds +
            b.timestamp.nanoseconds / 1000000000 -
            (a.timestamp.seconds + a.timestamp.nanoseconds / 1000000000)
        );
    });
    return userMessages;
};

export { getUserMessages };
