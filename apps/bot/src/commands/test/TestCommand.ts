import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

class TestCommand extends BaseCommand {
    constructor() {
        super("test", "testing", "siemanko? :)", ["t"]);
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        message.channel.send("Test command worasdfasdfks");
    }
}

export default TestCommand;
