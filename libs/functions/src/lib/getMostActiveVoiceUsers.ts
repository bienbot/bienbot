import { ChannelVoiceData, UserData } from "@bienbot/types";

const getMostActiveVoiceUsers = (
    channelStats: ChannelVoiceData,
    users: Record<string, UserData>,
    limit: number
) => {
    // Count every hour spent by each user
    const userHoursCount = new Map<string, number>();
    Object.keys(channelStats).forEach((channelId) => {
        Object.keys(channelStats[channelId]).forEach((userId) => {
            const hoursArray = channelStats[channelId][userId];
            hoursArray.forEach(() => {
                if (userHoursCount.has(userId)) {
                    userHoursCount.set(userId, userHoursCount.get(userId) + 1);
                } else {
                    userHoursCount.set(userId, 1);
                }
            });
        });
    });

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
