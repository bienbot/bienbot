import { GuildData } from "@bienbot/types";

/** Returns server statistics ready to use in StatisticsPanel component */
const getServerStatistics = (guildData: GuildData) => {
	const onlineMembers = guildData.members.filter(
		(member) => member.presence === "online"
	);

	const statistics = [
		{
			label: "Online members",
			text: onlineMembers.length.toString(),
		},
		{
			label: "All members",
			text: guildData.members.length.toString(),
		},
		{
			label: "Messages sent",
			text: guildData.messages.length.toString(),
		},
		{
			label: "Hours spent in VC",
			text: guildData.voicePresences.length.toString(),
		},
	];

	return statistics;
};

export { getServerStatistics };
