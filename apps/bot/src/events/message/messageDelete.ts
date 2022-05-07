import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import logEvent from "../../utils/function/logEvent";

class MessageEvent extends BaseEvent {
    constructor() {
        super("messageDelete");
    }

    async run(client: DiscordClient, message: Message) {
        logEvent({
            eventDescription: "Deleted message",
            eventTarget: message.content,
            eventMember: message.author,
            eventTargetId: message.id,
            eventTime: new Date(),
            guildId: message.guildId,
            eventType: "messageDelete",
            client,
        });
    }
}

export default MessageEvent;
