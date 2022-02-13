import { Message } from "discord.js";

const admin = require("firebase-admin");
const database = admin.firestore();

const addMessage = async (userId: string, guildId: string) => {
    const messages = await database.collection(guildId).doc("messages").get();
    const messagesData = messages.data();
    let count = 0;
    for (const channel in messagesData) {
        for (const message of messagesData[channel]) {
            if (message.author.id === userId) {
                count++;
            }
        }
    }
    return count;
};

export default addMessage;
