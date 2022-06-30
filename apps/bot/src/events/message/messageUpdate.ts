import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";
import { updateMessage } from "../../utils/function/updateMessage";

class MessageEvent extends BaseEvent {
    constructor() {
        super("messageUpdate");
    }

    async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
        if (oldMessage.author.bot) {
            return;
        }
        updateMessage({ client, oldMessage, newMessage });
    }
}

export default MessageEvent;
