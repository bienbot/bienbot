import { UserData } from "@bienbot/types";

export const getUserData = ({
    docData,
    users,
}: {
    docData: Record<string, UserData>;
    users?: string[];
}) => {
    if (users && users.length > 0) {
        const userData = {};
        for (const userId of users) {
            userData[userId] = docData[userId];
        }
        return userData;
    } else {
        return docData;
    }
};
