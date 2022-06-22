import { VoicePresenceData } from "@bienbot/types";

/** Calculate total time spent in voice channel in a given guild */
const calculateTotalVoiceTime = (
    channelStats: VoicePresenceData,
    userId?: string
): number => {
    return Object.keys(channelStats).length;
};

export { calculateTotalVoiceTime };
