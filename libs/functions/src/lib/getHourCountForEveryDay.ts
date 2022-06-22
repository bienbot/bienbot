import { VoicePresenceData } from "@bienbot/types";
import convertToDate from "./convertToDate";
import { getDays } from "./getDays";

const getHourCountForEveryDay = (
    hoursData: VoicePresenceData,
    numberOfDays: number,
    userId?: string
) => {
    const hoursCount = new Array(numberOfDays).fill(0);
    const daysArray = getDays(numberOfDays).map((date) => date.toDateString());

    for (const value of Object.values(hoursData)) {
        if (userId && userId !== value.userId) continue;
        const day = convertToDate(value.timestamp).toDateString();
        const index = daysArray.indexOf(day);
        if (index !== -1) {
            hoursCount[index]++;
        }
    }

    return hoursCount;
};

export { getHourCountForEveryDay };
