import { Message } from "discord.js";
import DiscordClient from "../../client/client";

const admin = require("firebase-admin");
const database = admin.firestore();

const addMessage = async (message: Message, client: DiscordClient) => {
    const messages = await database
        .collection(message.guildId)
        .doc("messages")
        .get();
    let messagesData = messages.data() ?? {};
    messagesData[message.channelId] = messagesData[message.channelId] ?? [];
    const channelMessages = messagesData[message.channelId];

    const guild = client.guilds.cache.get(message?.guild?.id ?? "");
    const member = await guild?.members.fetch(message.author);

    if (member) {
        const messageObject = {
            author: {
                username: message.author.username,
                discriminator: message.author.discriminator,
                displayName: member.displayName,
                id: message.author.id,
                avatar: message.author.avatarURL(),
            },
            content: { text: message.content },
            timestamp: message.createdAt,
        };
        channelMessages.push(messageObject);
        await database
            .collection(message.guildId)
            .doc("messages")
            .set({ ...messagesData, [message.channelId]: channelMessages });
    }
};

export default addMessage;
