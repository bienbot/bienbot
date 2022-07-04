import { Guild } from "discord.js";
import DiscordClient from "../../../client/client";

const updateGuildData = async (client: DiscordClient) => {
    const guilds = await client.guilds.fetch();
    if (!guilds) return;

    guilds.forEach(async (OAuthGuild) => {
        const guild = await OAuthGuild.fetch();
        if (guild instanceof Guild) {
            const serverData = {
                name: guild.name,
                id: guild.id,
                icon: guild.icon,
            };

            const { data, error } = await client.database
                .from("guilds")
                .select()
                .eq("id", guild.id);
            if (error) console.log(error);

            if (data?.length === 0) {
                await client.database.from("guilds").insert(serverData);
            } else {
                await client.database
                    .from("guilds")
                    .update(serverData)
                    .eq("id", guild.id);
            }
        }
    });
};

export default updateGuildData;
