import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import { fetchMessage } from "../../utils/function/database/fetchMessage";

class MessageEvent extends BaseEvent {
    constructor() {
        super("messageDelete");
    }

    async run(client: DiscordClient, message: Message) {
        const logs = await message?.guild?.fetchAuditLogs({ type: 72 });
        const entry = logs?.entries?.first();
        if (!entry?.executor) return;

        /* Checking if the message is in the database, if it is, it will update the deleted column to
       true. */
        const databaseMessage = await fetchMessage({ client, message });
        if (databaseMessage) {
            await client.database
                .from("messages")
                .update({ deleted: true })
                .eq("id", message.id);
        }

        /* Creating an object with the information of the event, and then inserting it into the
        database. */
        const eventObject = {
            description: "Deleted",
            target: "message",
            targetId: message.id,
            type: "messageDelete",
            member: `${entry.executor.id}-${message.guild?.id}`,
            guild: message.guild?.id,
        };

        const { error } = await client.database
            .from("events")
            .insert(eventObject);
        if (error) console.log(error);
    }
}

export default MessageEvent;
