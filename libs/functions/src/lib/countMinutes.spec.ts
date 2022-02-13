import { VoiceChannelStats } from "@bienbot/types";
import { countMinutes } from "./countMinutes";

const data: Record<string, VoiceChannelStats> = {
    channelID1: {
        userID1: [new Date()],
        userID2: [new Date(), new Date()],
        userID3: [new Date(), new Date(), new Date()],
    },
    channelID2: {
        userID1: [new Date(), new Date(), new Date()],
        userID2: [new Date(), new Date()],
        userID3: [new Date()],
    },
};

describe("countMinutes", () => {
    it("should return all users", () => {
        const minuteData = countMinutes({ docData: data });
        const userIDs = new Set();
        for (const channelID in data) {
            Object.keys(data[channelID]).forEach((userID) =>
                userIDs.add(userID)
            );
        }
        const minuteDataKeys = Object.keys(minuteData);
        minuteDataKeys.forEach((id) => {
            expect(userIDs.has(id)).toBeTruthy();
        });
    });

    it("should count only one user's data", () => {
        const USER_ID = "userID1";
        const minuteData = countMinutes({ docData: data, users: [USER_ID] });
        expect(minuteData[USER_ID]).toBe(4);
    });
    it("should count two user's data", () => {
        const USERS_ID = ["userID1", "userID2"];
        const minuteData = countMinutes({
            docData: data,
            users: [...USERS_ID],
        });
        expect(minuteData[USERS_ID[0]] + minuteData[USERS_ID[1]]).toBe(8);
    });

    it("should count only one user's data from only one channel", () => {
        const USER_ID = "userID3";
        const CHANNEL_ID = "channelID1";
        const minuteData = countMinutes({
            docData: data,
            users: [USER_ID],
            channels: [CHANNEL_ID],
        });
        expect(minuteData[USER_ID]).toBe(3);
    });
});
