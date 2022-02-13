import { GuildMember, Interaction, Message, MessageEmbed } from "discord.js";
import DiscordClient from "../../client/client";
import countMessages from "../../utils/function/countMessages";
import BaseCommand from "../../utils/structures/BaseCommand";

class displayMessageStatsCommand extends BaseCommand {
    constructor() {
        super(
            "messagecount",
            "Count how many messages has user sent",
            "stats",
            [],
            []
        );
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        if (!message.guild) return;
        if (message.author.bot) return;
        const userId =
            args[0].startsWith("<@!") && args[0].endsWith(">")
                ? args[0].slice(3, -1)
                : args[0];
        const count = await countMessages(userId, message.guildId ?? "");
        message.channel.send("User sent " + count + " messages");
    }

    async execute(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.member instanceof GuildMember) {
        }
    }
}

export default displayMessageStatsCommand;
