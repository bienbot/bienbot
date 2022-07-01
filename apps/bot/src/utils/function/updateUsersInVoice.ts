import DiscordClient from "../../client/client";
import { addMemberToDatabase } from "./database/addMemberToDatabase";
import { addChannelToDatabase } from "./database/addChannelToDatabase";
/**
 * Fetches all users in voice channels and updates the database with voicePresence data.
 *
 * @param {DiscordClient} client - The Discord client.
 * @returns Promise<void>.
 */

const updateUsersInVoiceChannels = async ({
    client,
}: {
    client: DiscordClient;
}) => {
    /* Fetching all the guilds that the bot is in. */
    const fetchedGuilds = await client.guilds.fetch();
    if (!fetchedGuilds) return;

    for await (const [_fetchedGuildId, fetchedGuild] of fetchedGuilds) {
        const guild = await fetchedGuild.fetch();
        if (!guild) continue;
        /* Fetch all the channels in the guild. */
        const channels = await guild.channels.fetch();
        if (!channels) continue;

        /* Looping over destructured channels collection. */
        for (const [_channelId, channel] of channels) {
            if (channel.type !== "GUILD_VOICE") continue;
            const voiceChannel = await channel.fetch();
            if (!voiceChannel) continue;
            const members = voiceChannel.members;
            if (!members) continue;
            /* Looping over destructured members collection. 
            And inserting voicePresence data into the database. */
            for (const [_memberId, member] of members) {
                const user = member.user;
                const voicePresenceObject = {
                    member: `${member.user.id}-${guild.id}`,
                    guild: guild.id,
                    channel: channel.id,
                };

                await addMemberToDatabase({
                    client,
                    user,
                    member,
                });

                await addChannelToDatabase({
                    client,
                    channel,
                });

                const { error } = await client.database
                    .from("voicePresences")
                    .insert(voicePresenceObject);
                if (error) console.log(error);
            }
        }
    }
};

export default updateUsersInVoiceChannels;
