import { VoicePresenceData, UserData } from "@bienbot/types";

const getMostActiveVoiceUsers = (
    channelStats: VoicePresenceData,
    users: Record<string, UserData>,
    limit: number
) => {
    // Count every hour spent by each user
    const userHoursCount = new Map<string, number>();

    for (const [_presenceId, presence] of Object.entries(channelStats)) {
        const user = users[presence.userId];
        if (user) {
            if (userHoursCount.has(presence.userId)) {
                userHoursCount.set(
                    presence.userId,
                    userHoursCount.get(presence.userId) + 1
                );
            } else {
                userHoursCount.set(presence.userId, 1);
            }
        }
    }

    const result = [];

    // Create user objects
    for (const [userId, count] of userHoursCount) {
        const user = users[userId];
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
