import { MessageData, UserData } from "@bienbot/types";

/**
 * Returns the most active users in all text channels.
 */
const getMostActiveTextUsers = (
    messagesData: Record<string, MessageData[]>,
    users: Record<string, UserData>,
    limit: number
) => {
    // Count every message sent by each user
    const usersMessagesCount = new Map<string, number>();
    Object.keys(messagesData).forEach((channelId) => {
        const messagesArray = messagesData[channelId];
        messagesArray.forEach((message) => {
            const userId = message.author.id;
            if (usersMessagesCount.has(userId)) {
                usersMessagesCount.set(
                    userId,
                    usersMessagesCount.get(userId) + 1
                );
            } else {
                usersMessagesCount.set(userId, 1);
            }
        });
    });

    const result = [];

    // Create user objects
    for (const [userId, count] of usersMessagesCount) {
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

export { getMostActiveTextUsers };
