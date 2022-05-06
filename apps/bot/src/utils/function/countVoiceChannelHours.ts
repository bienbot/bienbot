import { countHours } from "@bienbot/functions";

const admin = require("firebase-admin");
const database = admin.firestore();

const countVoiceChannelHours = async (userId: string, guildId: string) => {
    const channels = await database
        .collection(guildId)
        .doc("channelStats")
        .get();
    const channelsData = channels.data();
    if (!channelsData) return 0;
    const userHours = countHours({
        docData: channelsData,
        users: [userId],
    })[userId];
    return userHours;
};

export default countVoiceChannelHours;
