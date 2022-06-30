import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import { fetchMessage } from "./database/fetchMessage";

export const updateMessage = async ({
    client,
    oldMessage,
    newMessage,
}: {
    client: DiscordClient;
    oldMessage: Message;
    newMessage: Message;
}) => {
    const guildId = oldMessage?.guild?.id;
    if (!guildId) return;

    const messageData = await fetchMessage({ client, message: oldMessage });
    messageData.content = newMessage.content;
    messageData.history = [newMessage.content];

    // Update the message in the database
    const { error: updateError } = await client.database
        .from("messages")
        .update(messageData)
        .eq("id", oldMessage.id);
    if (updateError) console.log(updateError);
};
