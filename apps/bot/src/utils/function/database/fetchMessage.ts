import DiscordClient from "apps/bot/src/client/client";
import { Message } from "discord.js";

const fetchMessage = async ({
    client,
    message,
}: {
    client: DiscordClient;
    message: Message;
}) => {
    const { data, error: selectError } = await client.database
        .from("messages")
        .select()
        .eq("id", message.id);
    if (selectError) console.log(selectError);
    if (data?.length === 0 || !data) {
        console.log("Message not found in database");
        return null;
    } else {
        return data[0];
    }
};

export { fetchMessage };
