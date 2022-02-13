import { Message } from "discord.js";

const admin = require("firebase-admin");
const database = admin.firestore();

const addMessage = async (message: Message) => {
    const messages = await database
        .collection(message.guildId)
        .doc("messages")
        .get();
    let messagesData = messages.data() ?? {};
    messagesData[message.channelId] = messagesData[message.channelId] ?? [];
    const channelMessages = messagesData[message.channelId];
    const messageObject = {
        author: {
            username: message.author.username,
            discriminator: message.author.discriminator,
            id: message.author.id,
            avatar: message.author.avatarURL(),
        },
        content: message.content,
        timestamp: message.createdAt,
    };
    channelMessages.push(messageObject);
    await database
        .collection(message.guildId)
        .doc("messages")
        .set({ ...messagesData, [message.channelId]: channelMessages });
};

export default addMessage;
