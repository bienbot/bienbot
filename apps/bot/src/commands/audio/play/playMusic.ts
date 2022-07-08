import { GuildMember, Interaction, Message, MessageEmbed } from "discord.js";
import { ApplicationCommandOptionType } from "discord-api-types";
import { QueryType } from "discord-player";

import DiscordClient from "../../../client/client";
import BaseCommand from "../../../utils/structures/BaseCommand";

class PlayCommand extends BaseCommand {
	constructor() {
		super(
			"play",
			"Play music",
			"voice",
			["p"],
			[
				{
					name: "query",
					type: ApplicationCommandOptionType["String"],
					description: "The query to search for",
					required: true,
				},
			]
		);
	}

	async run(client: DiscordClient, message: Message, args: Array<string>) {
		if (!message.guild) return;
		const embed = new MessageEmbed();
		const channel = message.member?.voice.channel;
		const Guild = client.guilds.cache.get(message.guild.id);
		const Member = Guild?.members.cache.get(message.author.id);
		if (!channel) {
			embed.setColor("RED");
			embed.setTitle("Error");
			embed.addField(
				"Error",
				"You must be in a voice channel to use this command"
			);
			await message.channel.send({ embeds: [embed] });
			return;
		}
		const query = args.join(" ");
		if (!query) {
			await message.channel.send("Please provide a query");
			return;
		}
		// Search for song
		const res = await client.player.search(query, {
			requestedBy: message.author,
			searchEngine: QueryType.AUTO,
		});
		const track = res.tracks[0];
		if (!track) {
			await message.channel.send("No track found");
			return;
		}
		// Create queue
		const queue = client.player.createQueue(message.guild, {
			metadata: {
				channel: message.channel,
			},
		});
		// Join voice channel
		try {
			if (Member?.voice.channel) {
				if (!queue.connection)
					await queue.connect(Member.voice.channel);
			}
		} catch {
			queue.destroy();
			await message.channel.send("Could not connect to voice channel");
			return;
		}
		// Add track to queue
		try {
			queue.play(track);
		} catch (error) {
			console.error(error);
			await message.channel.send("Error playing track");
		}

		embed.setColor("GREEN");
		embed.setTitle("Added to the queue");
		embed.addField("Title", track.title);
		embed.addField("Duration", track.duration);
		embed.addField("Link", track.url);
		embed.addField("Query", query);
		embed.setFooter({
			text: "Requested by " + message.author.username,
			iconURL: message.author.avatarURL() ?? "",
		});
		embed.setImage(track.thumbnail);
		await message.channel.send({ embeds: [embed] });
		await message.delete();
	}

	async execute(interaction: Interaction) {
		if (!interaction.isCommand()) return;
		if (interaction.member instanceof GuildMember) {
			if (!interaction.member.voice.channelId)
				return await interaction.reply({
					content: "Join voice channel first",
					ephemeral: true,
				});
			// TODO: Check if user is in the same channel as bot
		}
	}
}

export default PlayCommand;
