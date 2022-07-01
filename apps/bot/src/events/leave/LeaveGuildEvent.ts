import { Guild } from "discord.js";
import DiscordClient from "../../client/client";
import BaseEvent from "../../utils/structures/BaseEvent";

class JoinGuildEvent extends BaseEvent {
    constructor() {
        super("guildDelete");
    }
    async run(client: DiscordClient, guild: Guild) {
        /* Delete all the data from the database that is related to the guild that the bot left. */
        await client.database.from("channels").delete().eq("guild", guild.id);
        await client.database.from("events").delete().eq("guild", guild.id);
        await client.database.from("guilds").delete().eq("id", guild.id);
        await client.database.from("members").delete().eq("guild", guild.id);
        await client.database.from("messages").delete().eq("guild", guild.id);
        await client.database.from("roles").delete().eq("guild", guild.id);
        await client.database
            .from("voicePresences")
            .delete()
            .eq("guild", guild.id);
    }
}

export default JoinGuildEvent;
