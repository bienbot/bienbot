import { GuildData } from "@bienbot/types";
import { calculateTotalMessagesSent } from "./calculateTotalMessagesSent";
import { calculateTotalVoiceTime } from "./calculateTotalVoiceTime";

/** Returns server statistics ready to use in StatisticsPanel component */
const getServerStatistics = (guildData: GuildData) => {
    const statistics = [
        {
            label: "Online users",
            text: guildData.data.onlineUsers.length.toString(),
        },
        {
            label: "All members",
            text: guildData.data.allUsers.length.toString(),
        },
        {
            label: "Messages sent",
            text: calculateTotalMessagesSent(guildData.messages).toString(),
        },
        {
            label: "Hours spent in VC",
            text: calculateTotalVoiceTime(guildData.channelStats).toString(),
        },
    ];

    return statistics;
};

export { getServerStatistics };
