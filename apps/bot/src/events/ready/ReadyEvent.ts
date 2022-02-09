import DiscordClient from "../../client/client";
import BaseEvent from "../../utils/structures/BaseEvent";

class ReadyEvent extends BaseEvent {
    constructor() {
        super("ready");
    }
    async run(client: DiscordClient) {
        console.log(client.user?.tag + " has logged in. :)");
    }
}

export default ReadyEvent;
