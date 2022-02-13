import { GuildMember, Interaction, Message, MessageEmbed } from "discord.js";
import DiscordClient from "../../client/client";
import countMessages from "../../utils/function/countMessages";
import countVoiceChannelMinutes from "../../utils/function/countVoiceChannelMinutes";
import BaseCommand from "../../utils/structures/BaseCommand";

class displayVoiceMinuteStats extends BaseCommand {
    constructor() {
        super("stats", "Display stats about the user", "stats", [], []);
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        if (!message.guild) return;
        if (message.author.bot) return;
        const userId =
            args.length > 0
                ? args[0].startsWith("<@!") && args[0].endsWith(">")
                    ? args[0].slice(3, -1)
                    : args[0]
                : message.author.id;
        const Guild = client.guilds.cache.get(message.guild.id);
        const Member = Guild?.members.cache.get(userId);
        const Author = Guild?.members.cache.get(message.author.id);
        if (!Member) {
            await message.channel.send("User not found");
            return;
        }
        if (!Author) {
            await message.channel.send(
                "Error while getting author of the message"
            );
            return;
        }

        const count = await countVoiceChannelMinutes(
            userId,
            message.guildId ?? ""
        );
        const embed = new MessageEmbed();
        embed.setColor("BLUE");
        embed.setTitle(`Stats: ${Member.nickname}`);
        embed.addField(
            "Minutes in VC",
            `${await countVoiceChannelMinutes(userId, message.guildId ?? "")}`
        );
        embed.addField(
            "Messages sent",
            `${await countMessages(userId, message.guildId ?? "")}`
        );
        embed.addField(
            "Account created",
            `${new Intl.DateTimeFormat("en-GB").format(
                new Date(Member.user.createdAt)
            )}`
        );
        embed.setThumbnail(Member.displayAvatarURL());
        embed.setFooter({
            text: "Requested by " + Author?.nickname,
            iconURL: message.author.displayAvatarURL(),
        });

        message.channel.send({ embeds: [embed] });
        await message.delete();
    }

    async execute(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.member instanceof GuildMember) {
        }
    }
}

export default displayVoiceMinuteStats;
