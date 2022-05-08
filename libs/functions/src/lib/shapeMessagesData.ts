import { GuildData } from "@bienbot/types";
import convertToDate from "./convertToDate";
import { getGuildMessages } from "./getGuildMessages";

export const shapeMessagesData = (guildData: GuildData) => {
    const messagesData = getGuildMessages(guildData);

    return messagesData.map((message) => {
        return {
            channel: {
                name: message.channel?.name,
                id: message.channel?.id ?? "",
            },
            time: `${convertToDate(message.timestamp).getHours()}:${
                convertToDate(message.timestamp).getMinutes() < 10 ? "0" : ""
            }${convertToDate(message.timestamp).getMinutes()}`,
            messageContent: message.content.text,
            messageId: message?.id ?? "",
            user: {
                imageSrc: message.author.avatar,
                displayName: message.author.displayName,
                discordTag: `${message.author.username}#${message.author.discriminator}`,
                id: message.author.id,
            },
        };
    });
};
