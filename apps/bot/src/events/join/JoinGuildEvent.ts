import { Guild } from "discord.js";
import DiscordClient from "../../client/client";
import addToGuildsArray from "../../utils/function/addToGuildsArray";
import BaseEvent from "../../utils/structures/BaseEvent";

class JoinGuildEvent extends BaseEvent {
    constructor() {
        super("guildCreate");
    }
    async run(client: DiscordClient, guild: Guild) {
        addToGuildsArray(guild);
    }
}

export default JoinGuildEvent;
