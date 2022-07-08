import DiscordClient from "../../client/client";

abstract class BaseEvent {
	constructor(private name: string) {}

	getName(): string {
		return this.name;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract run(client: DiscordClient, ...args: any): void;
}

export default BaseEvent;
