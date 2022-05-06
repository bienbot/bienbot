import { MessageData } from "@bienbot/types";
import convertToDate from "./convertToDate";
import { getDays } from "./getDays";

/**
 * Get the number of messages sent in all channels for every day.
 */
const getMessageCountForEveryDay = (
    messagesData: Record<string, MessageData[]>,
    numberOfDays: number
) => {
    const messagesCount = new Array(numberOfDays).fill(0);
    const daysArray = getDays(numberOfDays).map((date) => date.toDateString());

    Object.keys(messagesData).forEach((channelId) => {
        const messagesArray = messagesData[channelId];
        messagesArray.forEach((message) => {
            const messageDate = convertToDate(message.timestamp);
            if (daysArray.includes(messageDate.toDateString())) {
                const index = daysArray.indexOf(messageDate.toDateString());
                messagesCount[index] = messagesCount[index]
                    ? messagesCount[index] + 1
                    : 1;
            }
        });
    });
    return messagesCount;
};

export { getMessageCountForEveryDay };
