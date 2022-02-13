const admin = require("firebase-admin");
const database = admin.firestore();

const countVoiceChannelMinutes = async (userId: string, guildId: string) => {
    const channels = await database
        .collection(guildId)
        .doc("channelStats")
        .get();
    const channelsData = channels.data();
    let count = 0;
    for (const channel in channelsData) {
        for (const user in channelsData[channel]) {
            if (user === userId) {
                count += channelsData[channel][user].length;
            }
        }
    }
    return count;
};

export default countVoiceChannelMinutes;
