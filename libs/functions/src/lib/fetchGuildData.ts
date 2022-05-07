import { GuildData } from "@bienbot/types";
import { getDocs, collection, getFirestore } from "firebase/firestore";

import firebaseApp from "apps/admin-dashboard/services/firebase";
const database = getFirestore(firebaseApp);

const fetchGuildData = async (guildId: string) => {
    const dataSnap = await getDocs(collection(database, guildId));
    const result = {};
    dataSnap.forEach((doc) => {
        result[doc.id] = doc.data();
    });

    const guildData: GuildData = JSON.parse(JSON.stringify(result));
    return guildData;
};

export { fetchGuildData };
