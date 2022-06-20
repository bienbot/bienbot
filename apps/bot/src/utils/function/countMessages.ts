const admin = require("firebase-admin");
const database = admin.firestore();

const countMessages = async (userId: string, guildId: string) => {
    const messageChannelsRefs = await database
        .collection(guildId)
        .doc("messages")
        .listCollections();

    let count = 0;
    for await (const channelRef of messageChannelsRefs) {
        const channel = await channelRef.get();
        channel.docs.forEach((doc: any) => {
            const messageData = doc.data();
            if (messageData.author.id === userId) {
                count++;
            }
        });
    }
    return count;
};

export default countMessages;
