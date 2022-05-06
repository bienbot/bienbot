import { Message } from "discord.js";
import DiscordClient from "../../client/client";

const updateUsersInVoiceChannels = async (client: DiscordClient) => {
    const fetchedGuilds = await client.guilds.fetch();
    const Guilds = fetchedGuilds.map((guild) => guild);
    if (!Guilds) return;

    const admin = require("firebase-admin");
    const database = admin.firestore();

    Guilds.forEach(async (guild) => {
        let userInVC = false;
        const guildId = guild.id;
        const channelStats = await database
            .collection(guildId)
            .doc("channelStats")
            .get();
        const channelStatsData = channelStats.data();
        const guildChannels = guild.client.channels.cache;
        if (!guildChannels) return;
        guildChannels.forEach((channel) => {
            if (channel.type !== "GUILD_VOICE") return;
            if (!channelStatsData) return;
            channelStatsData[channel.id] = channelStatsData[channel.id] ?? {};
            channel.members.forEach((member) => {
                userInVC = true;
                const currentData =
                    channelStatsData[channel.id][member.user.id] ?? [];
                channelStatsData[channel.id][member.user.id] = [
                    ...currentData,
                    new Date(),
                ];
            });
        });

        if (userInVC) {
            try {
                await database
                    .collection(guildId)
                    .doc("channelStats")
                    .set({ ...channelStatsData });
            } catch (err) {
                console.error(err);
            }
        }
    });
};

export default updateUsersInVoiceChannels;
