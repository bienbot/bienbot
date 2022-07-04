import { VoicePresenceData } from "@bienbot/types";
import { getDays } from "./getDays";

const getHourCountForEveryDay = (
    voicePresences: VoicePresenceData[],
    numberOfDays: number,
    userIdFilter?: string
) => {
    const hoursCount = new Array(numberOfDays).fill(0);
    const daysArray = getDays(numberOfDays).map((date) => date.toDateString());

    for (const voicePresence of voicePresences) {
        /* The `member` property of the `VoicePresenceData` object is a string that looks like this:
        `"<@userId>-<guildId>"`. */
        const memberId = voicePresence.member.split("-")[0];
        if (userIdFilter && userIdFilter !== memberId) continue;
        const day = new Date(voicePresence.timestamp).toDateString();
        const index = daysArray.indexOf(day);
        if (index !== -1) {
            hoursCount[index]++;
        }
    }

    return hoursCount;
};

export { getHourCountForEveryDay };
