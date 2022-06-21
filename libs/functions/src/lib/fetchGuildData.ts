import { GuildData, MessageData } from "@bienbot/types";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

const fetchGuildData = async (guildId: string, firebaseApp: FirebaseApp) => {
    const database = getFirestore(firebaseApp);
    const dataSnap = await getDocs(collection(database, guildId));
    const result = {};
    dataSnap.forEach((doc) => {
        result[doc.id] = doc.data();
    });

    const guildData: GuildData = JSON.parse(JSON.stringify(result));

    // Get messages from subcollections

    let messagesData: Record<string, MessageData[]> = {};
    const messagesChannelsList = Object.keys(guildData.messages);

    for await (const channelId of messagesChannelsList) {
        const channelRef = await getDocs(
            collection(database, guildId, "messages", channelId)
        );

        channelRef.forEach((message) => {
            const messageData: MessageData = message.data() as MessageData;
            if (!messagesData[channelId]) {
                messagesData[channelId] = [messageData];
            } else {
                messagesData[channelId].push(messageData);
            }
        });
    }

    // Merge messagesData into guildData

    guildData.messages = JSON.parse(JSON.stringify(messagesData));

    return guildData;
};

export { fetchGuildData };
