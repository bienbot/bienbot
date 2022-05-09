import { GuildData, MessageData } from "@bienbot/types";
import convertToDate from "./convertToDate";
import { getGuildMessages } from "./getGuildMessages";

export const shapeMessagesData = (guildData: GuildData | MessageData[]) => {
    const messagesData =
        guildData instanceof Array ? guildData : getGuildMessages(guildData);

    return messagesData.map((message) => {
        return {
            channel: {
                name: message.channel?.name,
                id: message.channel?.id ?? "",
                href: "",
            },
            time: `${convertToDate(message.timestamp).getHours()}:${
                convertToDate(message.timestamp).getMinutes() < 10 ? "0" : ""
            }${convertToDate(message.timestamp).getMinutes()}`,
            message: {
                content: message.content.text,
                id: message?.id ?? "",
                href: "",
            },
            user: {
                imageSrc: message.author.avatar,
                displayName: message.author.displayName,
                discordTag: `${message.author.username}#${message.author.discriminator}`,
                id: message.author.id,
                href: "",
            },
        };
    });
};
