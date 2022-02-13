import { GuildMember, Interaction, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../../utils/structures/BaseCommand";
import DiscordClient from "../../../client/client";
import { getVoiceConnection } from "@discordjs/voice";

class LeaveCommand extends BaseCommand {
    constructor() {
        super("queue", "Show song queue", "voice", ["q"], []);
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        if (!message.guild) return;
        const embed = new MessageEmbed();
        const queue = client.player.getQueue(message.guild.id);
        if (!queue) {
            embed.setColor("RED");
            embed.setTitle("No music currently playing");
            await message.channel.send({ embeds: [embed] });
            return;
        }
        if (!queue.tracks[0]) {
            embed.setColor("YELLOW");
            embed.setTitle("No tracks in queue");
            await message.channel.send({ embeds: [embed] });
            return;
        }
        embed.setColor("YELLOW");
        embed.setTitle("Queue");
        embed.setDescription(
            queue.tracks.map((track) => `${track.title}`).join("\n")
        );
        embed.setFooter({
            text: "Requested by " + message.author.username,
            iconURL: message.author.avatarURL() ?? "",
        });
        await message.channel.send({ embeds: [embed] });
        await message.delete();
        return;
    }

    async execute(interaction: Interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.member instanceof GuildMember) {
        }
    }
}

export default LeaveCommand;
