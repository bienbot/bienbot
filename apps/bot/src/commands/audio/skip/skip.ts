import { GuildMember, Interaction, Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../../utils/structures/BaseCommand";
import DiscordClient from "../../../client/client";
import { getVoiceConnection } from "@discordjs/voice";

class LeaveCommand extends BaseCommand {
    constructor() {
        super("skip", "Skip played song", "voice", ["s"], []);
    }

    async run(client: DiscordClient, message: Message, args: Array<string>) {
        if (!message.guild) return;
        const queue = client.player.getQueue(message.guild.id);
        const embed = new MessageEmbed();

        if (!queue || !queue.playing) {
            embed.setColor("RED");
            embed.setTitle("Error");
            embed.addField("Error", "There is no song playing");
            message.channel.send({ embeds: [embed] });
            return;
        }

        const success = queue.skip();

        if (success) {
            embed.setColor("YELLOW");
            embed.setTitle("Skipped track");
            embed.addField("Title", queue.current.title);
            embed.setFooter({
                text: "Requested by " + message.author.username,
                iconURL: message.author.avatarURL() ?? "",
            });
        } else {
            embed.setColor("RED");
            embed.setTitle("Error");
            embed.addField("Error", "Could not skip");
        }

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
