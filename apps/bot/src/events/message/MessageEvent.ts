import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";

class MessageEvent extends BaseEvent {
    constructor() {
        super("messageCreate");
    }

    async run(client: DiscordClient, message: Message) {
        console.log(`${message.author.username}: ${message.content}`);
    }
}

export default MessageEvent;
