import { GuildMember, Interaction, Message } from "discord.js";
import DiscordClient from "../../client/client";
import countVoiceChannelMinutes from "../../utils/function/countVoiceChannelMinutes";
import BaseCommand from "../../utils/structures/BaseCommand";

class displayVoiceMinuteStats extends BaseCommand {
    constructor() {
        super(
            "minutecount",
            "Count how much time user has wasted",
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

        const count = await countVoiceChannelMinutes(
            userId,
            message.guildId ?? ""
        );
        message.channel.send("User spent " + count + " minutes");
    }

    async execute(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.member instanceof GuildMember) {
        }
    }
}

export default displayVoiceMinuteStats;
