import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import addMessage from "../../utils/function/addMessage";

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

        addMessage(message, client);
    }
}

export default MessageEvent;
