import { Message } from "discord.js";

import DiscordClient from "../../client/client";
import { fetchMessage } from "../../utils/function/database/fetchMessage";
import BaseEvent from "../../utils/structures/BaseEvent";

class MessageEvent extends BaseEvent {
	constructor() {
		super("messageUpdate");
	}

	async run(client: DiscordClient, oldMessage: Message, newMessage: Message) {
		if (oldMessage.author.bot) {
			return;
		}
		const guildId = oldMessage?.guild?.id;
		if (!guildId) return;

		const messageData = await fetchMessage({ client, message: oldMessage });
		if (!messageData) return;
		messageData.content = newMessage.content;
		messageData.history = [
			...(messageData.history ?? []),
			oldMessage.content,
		];

		// Update the message in the database
		const { error: updateError } = await client.database
			.from("messages")
			.update(messageData)
			.eq("id", oldMessage.id);
		if (updateError) console.log(updateError);
	}
}

export default MessageEvent;
