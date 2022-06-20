import { MessageData } from "@bienbot/types";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";

const admin = require("firebase-admin");
const database = admin.firestore();

const parseAttachments = (message: Message) =>
    JSON.parse(JSON.stringify([...message.attachments.values()]));

export const updateMessage = async (
    client: DiscordClient,
    oldMessage: Message,
    newMessage: Message
) => {
    const guildId = oldMessage?.guild?.id;
    if (!guildId) return;

    // Find the message in the database
    const messageChannelsRefs = await database
        .collection(guildId)
        .doc("messages")
        .listCollections();

    let message: MessageData | undefined;

    for await (const channelRef of messageChannelsRefs) {
        const channel = await channelRef.get();
        channel.docs.forEach((doc: any) => {
            const messageData = doc.data();
            if (messageData.id === oldMessage.id) {
                message = messageData;
            }
        });
    }
    if (!message) {
        console.log("Edited message not found in database");
        return;
    }

    // Change message content and history
    message.content = {
        text: newMessage.content,
        attachments: parseAttachments(newMessage),
    };
    message.history = [
        ...(message.history ?? []),
        {
            content: oldMessage.content,
            attachments: parseAttachments(oldMessage),
        },
    ];

    // Update the message in the database
    await database
        .collection(guildId)
        .doc("messages")
        .collection(newMessage.channelId)
        .doc(message.id)
        .set(message);
};
