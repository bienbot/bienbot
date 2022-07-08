import { MessageData } from "@bienbot/types";

import { getDays } from "./getDays";

/**
 * Get the number of messages sent in all channels for every day.
 */
const getMessageCountForEveryDay = (
	messagesData: MessageData[],
	numberOfDays: number,
	userIdFilter?: string
) => {
	const messagesCount = new Array(numberOfDays).fill(0);
	const daysArray = getDays(numberOfDays).map((date) => date.toDateString());

	for (const message of messagesData) {
		/* The `member` property of the `VoicePresenceData` object is a string that looks like this:
        `"<@userId>-<guildId>"`. */
		const memberId = message.author.split("-")[0];
		if (userIdFilter && userIdFilter !== memberId) continue;
		const day = new Date(message.timestamp).toDateString();
		const index = daysArray.indexOf(day);
		if (index !== -1) {
			messagesCount[index]++;
		}
	}

	return messagesCount;
};

export { getMessageCountForEveryDay };
