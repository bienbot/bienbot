import { VoiceChannelStats } from "@bienbot/types";

/** Calculate total time spent in voice channel in a given guild */
const calculateTotalVoiceTime = (
    channelStats: Record<string, VoiceChannelStats>,
    userId?: string
): number => {
    let totalVoiceTime = 0;
    Object.keys(channelStats).forEach((channelId) => {
        const channel = channelStats[channelId];
        Object.keys(channel).forEach((hourUserId) => {
            if (userId && userId !== hourUserId) {
                return;
            }
            totalVoiceTime += channel[hourUserId].length;
        });
    });
    return totalVoiceTime;
};

export { calculateTotalVoiceTime };
