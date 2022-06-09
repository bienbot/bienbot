import { Guild } from "discord.js";
import DiscordClient from "../../client/client";

const getGuildConfig = async (
    client: DiscordClient,
    guildId: string
): Promise<{ reportChannelId: string } | undefined> => {
    const Guilds = client.guilds.cache;
    if (!Guilds) return;

    const admin = require("firebase-admin");
    const database = admin.firestore();

    const x = await database.collection(guildId).doc("config").get();
    return x.data();
};

export default getGuildConfig;
