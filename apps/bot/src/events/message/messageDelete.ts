import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import logEvent from "../../utils/function/logEvent";

class MessageEvent extends BaseEvent {
    constructor() {
        super("messageDelete");
    }

    async run(client: DiscordClient, message: Message) {
        const logs = await message?.guild?.fetchAuditLogs({ type: 72 });
        const entry = logs?.entries?.first();
        if (!entry?.executor) return;

        await logEvent({
            eventDescription: "Deleted",
            eventTarget: "message",
            eventMember: entry.executor,
            eventTargetId: message.id,
            eventTime: new Date(),
            guildId: message.guildId,
            eventType: "messageDelete",
            client,
        });
    }
}

export default MessageEvent;
