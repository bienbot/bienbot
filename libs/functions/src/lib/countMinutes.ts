import { VoiceChannelStats } from "@bienbot/types";

type countMinutesArguments = {
    docData: Record<string, VoiceChannelStats>;
    channels?: string[];
    users?: string[];
};

type countMinutesReturnType = Record<string, number>;

export const countMinutes = ({
    docData,
    channels,
    users,
}: countMinutesArguments): countMinutesReturnType => {
    const minuteData = {};
    for (const channelId in docData) {
        if (channels && !channels.includes(channelId)) continue;
        for (const user in docData[channelId]) {
            if (users && !users.includes(user)) continue;
            minuteData[user] = minuteData[user]
                ? docData[channelId][user].length + minuteData[user]
                : docData[channelId][user].length;
        }
    }
    return minuteData;
};
