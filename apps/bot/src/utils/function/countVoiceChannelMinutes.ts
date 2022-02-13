import { countMinutes } from "@bienbot/functions";

const admin = require("firebase-admin");
const database = admin.firestore();

const countVoiceChannelMinutes = async (userId: string, guildId: string) => {
    const channels = await database
        .collection(guildId)
        .doc("channelStats")
        .get();
    const channelsData = channels.data();
    if (!channelsData) return 0;
    const userMinutes = countMinutes({
        docData: channelsData,
        users: [userId],
    })[userId];
    return userMinutes;
};

export default countVoiceChannelMinutes;
