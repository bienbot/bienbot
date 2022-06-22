import { GuildData } from "@bienbot/types";

const getUserMessages = (guildData: GuildData, userId: string) => {
    const userMessages = Object.values(guildData.data.messages).filter(
        (message) => message.author.id === userId
    );

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
