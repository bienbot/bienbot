import { Guild } from "discord.js";
import DiscordClient from "../../client/client";

interface MemberData {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    joinedAt: Date | null;
    roles: string[];
    displayName: string;
    bot: boolean;
    displayColor: `#${string}`;
    createdAt: number;
    presence: "online" | "idle" | "dnd" | "offline" | "invisible";
    boostingSince: Date | null;
}

const updateUsersData = async (client: DiscordClient) => {
    const Guilds = client.guilds.cache;
    if (!Guilds) return;

    const admin = require("firebase-admin");
    const database = admin.firestore();

    Guilds.forEach(async (guild) => {
        if (guild instanceof Guild) {
            const usersDoc = await database
                .collection(guild.id)
                .doc("users")
                .get();
            const usersData = await usersDoc.data();
            const guildMembers = await guild.members.fetch();
            const membersData: Record<string, MemberData> = {};

            guildMembers.forEach(async (member) => {
                const memberData: MemberData = {
                    id: member.id,
                    username: member.user.username,
                    discriminator: member.user.discriminator,
                    avatar: member.user.avatarURL(),
                    joinedAt: member.joinedAt,
                    roles: member.roles.cache.map((role) => role.id),
                    displayName: member.displayName,
                    bot: member.user.bot,
                    displayColor: member.displayHexColor,
                    createdAt: member.user.createdTimestamp,
                    presence: member.presence?.status ?? "offline",
                    boostingSince: member.premiumSince,
                };
                membersData[member.id] = memberData;
            });
            await database
                .collection(guild.id)
                .doc("users")
                .set({ ...usersData, ...membersData });
        }
    });
};

export default updateUsersData;
