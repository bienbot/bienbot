import DiscordClient from "../../../client/client";
import { addMemberToDatabase } from "./addMemberToDatabase";

/**
 * Fetches all guilds, then fetches all members in each guild, and then adds each member to the
 * database
 * @param {DiscordClient} client - The Discord client.
 * @returns Promise<void>
 */
const updateUsersData = async (client: DiscordClient) => {
    const fetchedGuilds = await client.guilds.fetch();
    if (!fetchedGuilds) return;

    for await (const [_fetchedGuildId, fetchedGuild] of fetchedGuilds) {
        const guild = await fetchedGuild.fetch();
        if (!guild) continue;

        const members = await guild.members.fetch();
        for (const [_memberId, member] of members) {
            const user = member.user;
            await addMemberToDatabase({ client, member, user });
        }
    }
};

export default updateUsersData;
