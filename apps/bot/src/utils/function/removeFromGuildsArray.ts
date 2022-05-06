import { Guild } from "discord.js";

const admin = require("firebase-admin");
const database = admin.firestore();

const removeFromGuildsArray = async (guild: Guild) => {
    const guilds = await database.collection("data").doc("guilds").get();
    let GuildsData = await guilds.data();
    const currentGuildsData = GuildsData.currentGuilds ?? [];
    const filteredGuilds = currentGuildsData.filter(
        (guildId: string) => guildId !== guild.id
    );

    await database
        .collection("data")
        .doc("guilds")
        .set({
            currentGuilds: [...filteredGuilds],
        });
};

export default removeFromGuildsArray;
