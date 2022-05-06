import { Guild } from "discord.js";
import DiscordClient from "../../client/client";
import removeFromGuildsArray from "../../utils/function/removeFromGuildsArray";
import BaseEvent from "../../utils/structures/BaseEvent";

class JoinGuildEvent extends BaseEvent {
    constructor() {
        super("guildDelete");
    }
    async run(client: DiscordClient, guild: Guild) {
        removeFromGuildsArray(guild);
    }
}

export default JoinGuildEvent;
