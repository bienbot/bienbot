import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";

class InteractionCreate extends BaseEvent {
    constructor() {
        super("interactionCreate");
    }

    async run(client: DiscordClient, interaction: any) {
        console.log("witam");
        if (!interaction.isCommand()) return;
        interaction.reply("witam");
    }
}

export default InteractionCreate;
