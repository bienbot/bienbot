import DiscordClient from "../../client/client";

abstract class BaseCommand {
    constructor(
        private name: string,
        private category: any,
        private description: string,
        private aliases: any
    ) {}

    abstract run(client: DiscordClient, message: any, args: any): Promise<void>;
}

export default BaseCommand;
