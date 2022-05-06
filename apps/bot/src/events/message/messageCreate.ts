import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import addMessage from "../../utils/function/addMessage";
import logEvent from "../../utils/function/logEvent";

class MessageEvent extends BaseEvent {
    constructor() {
        super("messageCreate");
    }

    async run(client: DiscordClient, message: Message) {
        console.log(
            `${message.author.bot ? "BOT " : ""}${message.author.username}#${
                message.author.discriminator
            }: ${message.content}`
        );
        if (message.author.bot) return;
        if (message.content.startsWith(client.prefix)) {
            const [cmdName, ...cmdArgs] = message.content
                .slice(client.prefix.length)
                .trim()
                .split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
                command.run(client, message, cmdArgs);
            }
        }
        if (
            message.content.toLowerCase().endsWith(" co") ||
            message.content.toLowerCase().endsWith(" co?") ||
            message.content.toLowerCase().endsWith(" co!") ||
            message.content.toLowerCase().startsWith("co")
        ) {
            // await message.channel.send("jajco 1:0");
            await message.reply("jajco 1:0");
        }
        addMessage(message);
        logEvent({
            eventDescription: "Sent message",
            eventTarget: message.content,
            eventMember: message.author,
            eventTargetId: message.id,
            eventTime: new Date(),
            guildId: message.guildId,
            eventType: "messageCreate",
        });
    }
}

export default MessageEvent;
