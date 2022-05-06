import { Guild } from "discord.js";

const admin = require("firebase-admin");
const database = admin.firestore();

const addToGuildsArray = async (guild: Guild) => {
    const guilds = await database.collection("data").doc("guilds").get();
    let GuildsData = await guilds.data();
    const currentGuildsData = GuildsData.currentGuilds ?? [];

    await database
        .collection("data")
        .doc("guilds")
        .set({ currentGuilds: [...currentGuildsData, guild.id] });
};

export default addToGuildsArray;
