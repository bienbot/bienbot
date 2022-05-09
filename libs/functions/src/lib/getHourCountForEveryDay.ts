import { ChannelVoiceData } from "@bienbot/types";
import convertToDate from "./convertToDate";
import { getDays } from "./getDays";

const getHourCountForEveryDay = (
    hoursData: ChannelVoiceData,
    numberOfDays: number,
    userId?: string
) => {
    const hoursCount = new Array(numberOfDays).fill(0);
    const daysArray = getDays(numberOfDays).map((date) => date.toDateString());

    Object.keys(hoursData).forEach((channelId) => {
        Object.keys(hoursData[channelId]).forEach((hourUserId) => {
            if (userId && userId !== hourUserId) {
                return;
            }
            const hoursArray = hoursData[channelId][hourUserId];
            hoursArray.forEach((timestamp) => {
                const hourDate = convertToDate(timestamp);
                if (daysArray.includes(hourDate.toDateString())) {
                    const index = daysArray.indexOf(hourDate.toDateString());
                    hoursCount[index] = hoursCount[index]
                        ? hoursCount[index] + 1
                        : 1;
                }
            });
        });
    });

    return hoursCount;
};

export { getHourCountForEveryDay };
