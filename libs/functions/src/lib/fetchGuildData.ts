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

    const guildData = JSON.parse(JSON.stringify(result));

    // Get messages from subcollections
    let messagesData = {};
    const messagesRef = await getDocs(
        collection(database, guildId, "data", "messages")
    );
    messagesRef.forEach((doc) => {
        messagesData[doc.id] = doc.data();
    });

    // Get voicePresence from subcollection
    let voicePresenceData: Record<string, any> = {};
    const voicePresenceRef = await getDocs(
        collection(database, guildId, "data", "voicePresence")
    );
    voicePresenceRef.forEach((doc) => {
        const data = doc.data();
        voicePresenceData[doc.id] = data;
    });

    // Get events from subcollection
    let eventsData: Record<string, any> = {};
    const eventsRef = await getDocs(
        collection(database, guildId, "data", "events")
    );
    eventsRef.forEach((doc) => {
        eventsData[doc.id] = doc.data();
    });

    guildData.data.messages = JSON.parse(JSON.stringify(messagesData));
    guildData.data.voicePresence = JSON.parse(
        JSON.stringify(voicePresenceData)
    );
    guildData.data.events = JSON.parse(JSON.stringify(eventsData));

    return guildData as GuildData;
};

export { fetchGuildData };
