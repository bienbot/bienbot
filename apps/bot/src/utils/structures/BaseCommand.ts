import { Interaction, Message } from "discord.js";

import DiscordClient from "../../client/client";
import { Option } from "../types";

abstract class BaseCommand {
	constructor(
		private name: string,
		private description: string,
		private category: string,
		private aliases: Array<string>,
		private options: Option[]
	) {}

	getName(): string {
		return this.name;
	}
	getCategory(): string {
		return this.category;
	}
	getAliases(): Array<string> {
		return this.aliases;
	}

	setOptions(options: Option[]) {
		this.options = options;
	}

	abstract run(
		client: DiscordClient,
		message: Message,
		args: Array<string> | null
	): Promise<void>;
	abstract execute?(interaction: Interaction): Promise<void>;
}

export default BaseCommand;
