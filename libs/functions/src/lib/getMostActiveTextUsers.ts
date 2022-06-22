import { MessageData, UserData } from "@bienbot/types";

/**
 * Returns the most active users in all text channels.
 */
const getMostActiveTextUsers = (
    messagesData: Record<string, MessageData>,
    users: Record<string, UserData>,
    limit: number
) => {
    const usersMessagesCount = new Map<string, number>();

    // Count every message sent by each user
    for (const message of Object.values(messagesData)) {
        const user = users[message.author.id];
        if (user) {
            if (usersMessagesCount.has(message.author.id)) {
                usersMessagesCount.set(
                    message.author.id,
                    usersMessagesCount.get(message.author.id) + 1
                );
            } else {
                usersMessagesCount.set(message.author.id, 1);
            }
        }
    }

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
