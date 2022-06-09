import { ApplicationCommandOptionType } from "discord-api-types";
import {
    Guild,
    GuildMember,
    Interaction,
    Message,
    MessageEmbed,
} from "discord.js";
import DiscordClient from "../../client/client";
import countMessages from "../../utils/function/countMessages";
import countVoiceChannelHours from "../../utils/function/countVoiceChannelHours";
import BaseCommand from "../../utils/structures/BaseCommand";

const createEmbed = async ({
    member,
    author,
    guildId,
}: {
    member: GuildMember;
    author: GuildMember;
    guildId: string;
}) => {
    const embed = new MessageEmbed();
    embed.setColor("BLUE");
    embed.setTitle(`${member.nickname || member.user.username}`);
    embed.addField(
        "Hours in VC",
        `${(await countVoiceChannelHours(member.id, guildId)) ?? "0"}`
    );
    embed.addField(
        "Messages sent",
        `${(await countMessages(member.id, guildId)) ?? "0"}`
    );
    embed.addField(
        "Account created",
        `${new Intl.DateTimeFormat("en-GB").format(
            new Date(member.user.createdAt)
        )}`
    );
    embed.setThumbnail(member.displayAvatarURL());
    embed.setFooter({
        text: "Requested by " + author?.nickname,
        iconURL: author.displayAvatarURL(),
    });
    return embed;
};

class displayVoiceHourStats extends BaseCommand {
    constructor() {
        super(
            "stats",
            "Display stats about the user",
            "stats",
            [],
            [
                {
                    name: "user",
                    type: ApplicationCommandOptionType["User"],
                    description: "The user to search for",
                    required: false,
                },
            ]
        );
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

        const count = await countVoiceChannelHours(
            userId,
            message.guildId ?? ""
        );
        const embed = new MessageEmbed();
        embed.setColor("BLUE");
        embed.setTitle(`Stats: ${Member.nickname}`);
        embed.addField(
            "Hours in VC",
            `${await countVoiceChannelHours(userId, message.guildId ?? "0")}`
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
            const client = interaction.client as DiscordClient;
            const author = interaction.member;
            const member = interaction.options.getUser("user") ?? author;

            if (!interaction.guildId) return;
            const Guild = client.guilds.cache.get(interaction.guildId);

            if (!member?.id) return;

            const Member = Guild?.members.cache.get(member.id);
            const Author = Guild?.members.cache.get(author.id);

            if (!Member) return;
            if (!Author) return;

            const embed = await createEmbed({
                member: Member,
                author: Author,
                guildId: interaction.guildId,
            });
            interaction.reply({ embeds: [embed] });
        }
    }
}

export default displayVoiceHourStats;
