import { DMChannel, Message, TextChannel } from "discord.js";
import DiscordClient from "../../client/client";

const admin = require("firebase-admin");
const database = admin.firestore();

const addMessage = async (message: Message, client: DiscordClient) => {
    const guild = client.guilds.cache.get(message?.guild?.id ?? "");
    const member = await guild?.members.fetch(message.author);

    if (member && message.channel instanceof TextChannel) {
        const parsedAttachments = JSON.parse(
            JSON.stringify([...message.attachments.values()])
        );

        const messageObject = {
            author: {
                username: message.author.username,
                discriminator: message.author.discriminator,
                displayName: member.displayName,
                id: message.author.id,
                avatar: message.author.avatarURL(),
            },
            content: {
                text: message.content,
                attachments: parsedAttachments ?? [],
            },
            channel: {
                name: message.channel.name,
                id: message.channel.id,
            },
            timestamp: message.createdAt,
            id: message.id,
        };
        try {
            await database
                .collection(message.guildId)
                .doc("messages")
                .collection(message.channelId)
                .doc(message.id)
                .set(messageObject);

            const collections = (
                await database
                    .collection(message.guildId)
                    .doc("messages")
                    .listCollections()
            ).map((collection: any) => collection.id);

            await database.collection(message.guildId).doc("messages").set({
                textChannels: collections,
            });
        } catch (err) {
            console.error(err);
            throw new Error("Error adding message");
        }
    }
};

export default addMessage;
