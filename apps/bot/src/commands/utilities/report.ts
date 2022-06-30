import { ApplicationCommandOptionType } from "discord-api-types";
import {
    GuildMember,
    Interaction,
    Message,
    MessageEmbed,
    TextChannel,
} from "discord.js";
import DiscordClient from "../../client/client";
import BaseCommand from "../../utils/structures/BaseCommand";

const createEmbed = ({ message }: { message: string }) => {
    const embed = new MessageEmbed();
    embed.setColor("BLUE");
    embed.setAuthor({
        name: "Anonymous User",
    });
    embed.setDescription(`${message}`);
    return embed;
};

class displayVoiceHourStats extends BaseCommand {
    constructor() {
        super(
            "report",
            "Anonymous report",
            "utilities",
            [],
            [
                {
                    name: "message",
                    type: ApplicationCommandOptionType["String"],
                    description: "Content of your anonymous report",
                    required: true,
                },
            ]
        );
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        if (!message.guild) return;
        if (message.author.bot) return;
        await message.delete();
    }

    async execute(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.member instanceof GuildMember) {
            const client = interaction.client as DiscordClient;
            interaction.reply({
                content: "Thank you for your report!",
                ephemeral: true,
            });

            const content = interaction.options.getString("message") ?? "";

            // Get the channel to send the report to
            const { data, error } = await client.database
                .from("guilds")
                .select()
                .eq("id", interaction.guildId);
            if (error) console.log(error);

            const reportChannelId =
                data?.[0].reportChannelId ?? interaction.channelId;

            const reportChannel: TextChannel = client.channels.cache.get(
                reportChannelId
            ) as TextChannel;

            // Send the report
            const embed = createEmbed({ message: content });
            await reportChannel.send({ embeds: [embed] });
        }
    }
}

export default displayVoiceHourStats;
