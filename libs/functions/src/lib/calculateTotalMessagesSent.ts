import { MessageData } from "@bienbot/types";

/** Calculate total messages sent in all text channels in a given guild */
const calculateTotalMessagesSent = (
    messagesData: Record<string, MessageData>
) => {
    return Object.keys(messagesData).length;
};

export { calculateTotalMessagesSent };
