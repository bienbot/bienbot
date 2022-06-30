import { Guild } from "discord.js";
import DiscordClient from "../../client/client";
import BaseEvent from "../../utils/structures/BaseEvent";

class JoinGuildEvent extends BaseEvent {
    constructor() {
        super("guildCreate");
    }
    async run(client: DiscordClient, guild: Guild) {
        await client.database.from("guilds").insert({
            id: guild.id,
            name: guild.name,
            reportChannelId: null,
        });
    }
}

export default JoinGuildEvent;
