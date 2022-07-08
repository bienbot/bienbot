import { MemberData,MessageData } from "@bienbot/types";

/**
 * Returns the most active users in all text channels.
 */
const getMostActiveTextUsers = (
	messagesData: MessageData[],
	users: MemberData[],
	limit: number
) => {
	const usersMessagesCount = new Map<string, number>();

	// Count every message sent by each user
	for (const message of messagesData) {
		/* The `member` property of the `VoicePresenceData` object is a string that looks like this:
        `"<@userId>-<guildId>"`. */
		const memberId = message.author.split("-")[0];
		if (memberId) {
			if (usersMessagesCount.has(memberId)) {
				usersMessagesCount.set(
					memberId,
					(usersMessagesCount.get(memberId) ?? 0) + 1
				);
			} else {
				usersMessagesCount.set(memberId, 1);
			}
		}
	}

	const result = [];

	// Create user objects
	for (const [userId, count] of usersMessagesCount) {
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

export { getMostActiveTextUsers };
