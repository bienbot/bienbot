import BaseEvent from "../../utils/structures/BaseEvent";
import DiscordClient from "../../client/client";
import { Interaction } from "discord.js";

class InteractionCreate extends BaseEvent {
    constructor() {
        super("interactionCreate");
    }

    async run(client: DiscordClient, interaction: Interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command?.execute?.(interaction);
        } catch (err) {
            console.error(err);
        }
    }
}

export default InteractionCreate;
