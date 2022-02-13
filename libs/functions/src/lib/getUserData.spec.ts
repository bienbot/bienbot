import { UserData } from "@bienbot/types";
import { getUserData } from "./getUserData";

const userData = {
    avatar: "avatar1",
    bot: false,
    createdAt: 1,
    discriminator: "1111",
    displayColor: "#ffffff",
    displayName: "displayName1",
    id: "userID1",
    joinedAt: new Date(),
    roles: ["role1"],
    username: "username1",
};

const data: Record<string, UserData> = {
    userID: userData,
    userID2: userData,
};

describe("getUserData", () => {
    it("Should return object with properties userID and userID2", () => {
        const userIDs = new Set();
        for (const userID in data) {
            userIDs.add(userID);
        }
        userIDs.forEach((id) => {
            expect(Object.keys(getUserData({ docData: data }))).toContain(id);
        });
    });
    it("Should return an user object with key userID when passed an users array", () => {
        const USER_ID = "userID";
        expect(
            Object.keys(getUserData({ docData: data, users: [USER_ID] }))
        ).toContain(USER_ID);
    });

    it("should return valid UserData object", () => {
        const USER_ID = "userID";
        const userObject = getUserData({ docData: data })[USER_ID];
        const properties = Object.keys(userData);
        properties.forEach((property) => {
            expect(userObject).toHaveProperty(property);
            expect(userObject[property]).toBe(userData[property]);
        });
    });
    it("should return valid UserData object, when passed an users array", () => {
        const USER_ID = "userID";
        const userObject = getUserData({ docData: data, users: [USER_ID] })[
            USER_ID
        ];
        const properties = Object.keys(userData);
        properties.forEach((property) => {
            expect(userObject).toHaveProperty(property);
            expect(userObject[property]).toBe(userData[property]);
        });
    });
});
