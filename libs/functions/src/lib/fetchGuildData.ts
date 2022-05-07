import { GuildData } from "@bienbot/types";
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
    return guildData;
};

export { fetchGuildData };
