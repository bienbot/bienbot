import { Message, TextChannel } from "discord.js";

import DiscordClient from "../../client/client";
import { addChannelToDatabase } from "../../utils/function/database/addChannelToDatabase";
import { addMemberToDatabase } from "../../utils/function/database/addMemberToDatabase";
import { addMessageToDatabase } from "../../utils/function/database/addMessageToDatabase";
import BaseEvent from "../../utils/structures/BaseEvent";

class MessageEvent extends BaseEvent {
	constructor() {
		super("messageCreate");
	}

	async run(client: DiscordClient, message: Message) {
		if (message.author.bot) return;

		const guild = client.guilds.cache.get(message?.guild?.id ?? "");
		const member = await guild?.members.fetch(message.author);

		if (member && message.channel instanceof TextChannel) {
			await addMemberToDatabase({ client, user: message.author, member });
			await addChannelToDatabase({ client, channel: message.channel });
			await addMessageToDatabase({ client, message });
		}
	}
}

export default MessageEvent;
