import { TextChannel, VoiceChannel } from "discord.js";

import DiscordClient from "../../../client/client";

const addChannelToDatabase = async ({
	client,
	channel,
}: {
	client: DiscordClient;
	channel: TextChannel | VoiceChannel;
}) => {
	const channelObject = {
		id: channel.id,
		name: channel.name,
		type: channel.type,
		guild: channel.guild.id,
	};

	const { data: channelData, error } = await client.database
		.from("channels")
		.select()
		.eq("id", channel.id);
	if (error) console.log(error);

	if (channelData?.length === 0) {
		const { error } = await client.database
			.from("channels")
			.insert([channelObject]);
		if (error) console.log(error);
	} else {
		const { error } = await client.database
			.from("channels")
			.update(channelObject)
			.eq("id", channel.id);
		if (error) console.log(error);
	}
};

export { addChannelToDatabase };
