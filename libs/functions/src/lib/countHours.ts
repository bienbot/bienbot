import { VoiceChannelStats } from "@bienbot/types";

type countHoursArguments = {
    docData: Record<string, VoiceChannelStats>;
    channels?: string[];
    users?: string[];
};

type countHoursReturnType = Record<string, number>;

export const countHours = ({
    docData,
    channels,
    users,
}: countHoursArguments): countHoursReturnType => {
    const hourData = {};
    for (const channelId in docData) {
        if (channels && !channels.includes(channelId)) continue;
        for (const user in docData[channelId]) {
            if (users && !users.includes(user)) continue;
            hourData[user] = hourData[user]
                ? docData[channelId][user].length + hourData[user]
                : docData[channelId][user].length;
        }
    }
    return hourData;
};
