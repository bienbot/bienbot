import { Message } from "discord.js";
import DiscordClient from "../../../client/client";

const addMessageToDatabase = async ({
    client,
    message,
}: {
    client: DiscordClient;
    message: Message;
}) => {
    const parsedAttachments = JSON.parse(
        JSON.stringify([...message.attachments.values()])
    );

    const messageObject = {
        id: message.id,
        content: message.content,
        timestamp: message.createdAt,
        author: `${message.author.id}-${message.guild?.id}`,
        channel: message.channel.id,
        attachments: parsedAttachments ?? [],
        guild: message.guild?.id,
        deleted: false,
    };

    const { error } = await client.database
        .from("messages")
        .insert([messageObject]);
    if (error) console.log(error);
};

export { addMessageToDatabase };
