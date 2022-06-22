import DiscordClient from "../../client/client";
import { Timestamp } from "firebase-admin/firestore";

function getServerTimestamp() {
    const datesMs = new Date().getTime();
    return new Timestamp(Math.floor(datesMs / 1000), (datesMs % 1000) * 1000);
}

const updateUsersInVoiceChannels = async (client: DiscordClient) => {
    const fetchedGuilds = await client.guilds.fetch();
    const Guilds = fetchedGuilds.map((guild) => guild);
    if (!Guilds) return;

    const admin = require("firebase-admin");
    const database = admin.firestore();

    Guilds.forEach(async (guild) => {
        const guildId = guild.id;
        const guildChannels2 = guild.client.channels.cache;
        for (const channel of guildChannels2.values()) {
            if (channel.type === "GUILD_VOICE") {
                channel.members.forEach((member) => {
                    if (member.user.bot) return;
                    database
                        .collection(guildId)
                        .doc("data")
                        .collection("voicePresence")
                        .add({
                            userId: member.id,
                            channelId: channel.id,
                            timestamp: getServerTimestamp(),
                        });
                });
            }
        }
    });
};

export default updateUsersInVoiceChannels;
