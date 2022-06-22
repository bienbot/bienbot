import { MessageData } from "@bienbot/types";
import convertToDate from "./convertToDate";
import { getDays } from "./getDays";

/**
 * Get the number of messages sent in all channels for every day.
 */
const getMessageCountForEveryDay = (
    messagesData: Record<string, MessageData>,
    numberOfDays: number,
    userId?: string
) => {
    const messagesCount = new Array(numberOfDays).fill(0);
    const daysArray = getDays(numberOfDays).map((date) => date.toDateString());

    for (const [key, value] of Object.entries(messagesData)) {
        if (userId && userId !== key) continue;
        const day = convertToDate(value.timestamp).toDateString();
        const index = daysArray.indexOf(day);
        if (index !== -1) {
            messagesCount[index]++;
        }
    }

    return messagesCount;
};

export { getMessageCountForEveryDay };
