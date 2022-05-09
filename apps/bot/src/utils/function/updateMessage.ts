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

    const messages = await database.collection(guildId).doc("messages").get();
    let messagesData = messages.data();
    if (!messagesData) return;

    for (const channel in messagesData) {
        const channelMessages = messagesData[channel];
        if (!channelMessages) continue;
        for (const message of channelMessages) {
            if (message.id === oldMessage.id) {
                message.content = {
                    text: newMessage.content,
                    attachments: parseAttachments(newMessage),
                };
                const history = {
                    content: {
                        text: oldMessage.content,
                        attachments: parseAttachments(oldMessage),
                    },
                };

                message.history = [...(message.history ?? []), history];

                channelMessages[oldMessage.id] = message;

                await database
                    .collection(guildId)
                    .doc("messages")
                    .set({ ...messagesData, [channel]: channelMessages });
            }
        }
    }
};
