import { Guild } from "discord.js";
import DiscordClient from "../../client/client";

interface ServerData {
    onlineUsers: string[];
    allUsers: string[];
    id: string;
    name: string;
}

const updateGuildData = async (client: DiscordClient) => {
    const Guilds = client.guilds.cache;
    if (!Guilds) return;

    const admin = require("firebase-admin");
    const database = admin.firestore();

    Guilds.forEach(async (guild) => {
        if (guild instanceof Guild) {
            const guildMembers = await guild.members.fetch();
            const serverData: ServerData = {
                onlineUsers: [],
                allUsers: [],
                id: guild.id,
                name: guild.name,
            };

            guildMembers.forEach(async (member) => {
                serverData.allUsers.push(member.id);
                if (member.presence?.status) {
                    serverData.onlineUsers.push(member.id);
                }
            });
            await database
                .collection(guild.id)
                .doc("serverInfo")
                .set(serverData);
        }
    });
};

export default updateGuildData;
