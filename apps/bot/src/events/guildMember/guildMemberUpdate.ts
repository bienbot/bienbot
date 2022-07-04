import BaseEvent from "../../utils/structures/BaseEvent";
import { GuildMember } from "discord.js";
import DiscordClient from "../../client/client";
import { addMemberToDatabase } from "../../utils/function/database/addMemberToDatabase";

class MessageEvent extends BaseEvent {
    constructor() {
        super("guildMemberUpdate");
    }

    async run(
        client: DiscordClient,
        _oldMember: GuildMember,
        newMember: GuildMember
    ) {
        addMemberToDatabase({
            client,
            user: newMember.user,
            member: newMember,
        });
    }
}

export default MessageEvent;
