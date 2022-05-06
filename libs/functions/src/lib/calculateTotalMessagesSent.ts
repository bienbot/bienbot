import { MessageData } from "@bienbot/types";

/** Calculate total messages sent in all text channels in a given guild */
const calculateTotalMessagesSent = (
    messagesData: Record<string, MessageData[]>
) => {
    return Object.keys(messagesData).reduce((acc, key) => {
        return acc + messagesData[key].length;
    }, 0);
};

export { calculateTotalMessagesSent };
