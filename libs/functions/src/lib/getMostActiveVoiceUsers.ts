import { MemberData,VoicePresenceData } from "@bienbot/types";

const getMostActiveVoiceUsers = (
	voicePresences: VoicePresenceData[],
	users: MemberData[],
	limit: number
) => {
	// Count every hour spent by each user
	const userHoursCount = new Map<string, number>();

	for (const voicePresence of voicePresences) {
		/* The `member` property of the `VoicePresenceData` object is a string that looks like this:
        `"<@userId>-<guildId>"`. */
		const memberId = voicePresence.member.split("-")[0];
		if (memberId) {
			if (userHoursCount.has(memberId)) {
				userHoursCount.set(
					memberId,
					(userHoursCount.get(memberId) ?? 0) + 1
				);
			} else {
				userHoursCount.set(memberId, 1);
			}
		}
	}

	const result = [];

	// Create user objects
	for (const [userId, count] of userHoursCount) {
		const user = users.find((user) => user.id === userId);
		if (user) {
			result.push({
				imageSrc: user.avatar,
				displayName: user.displayName,
				discordTag: user.discriminator,
				count: count,
				username: user.username,
				href: `/users/${userId}`,
			});
		}
	}

	// Sort result by user count
	result.sort((a, b) => b.count - a.count);

	return result.slice(0, limit);
};

export { getMostActiveVoiceUsers };
