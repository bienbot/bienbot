/* eslint-disable @typescript-eslint/no-var-requires */
import { Intents } from "discord.js";

import DiscordClient from "./client/client";
import { addRolesToDatabase } from "./utils/function/database/addRolesToDatabase";
import updateGuildData from "./utils/function/database/updateGuildData";
import updateUsersData from "./utils/function/database/updateUsersData";
import updateUsersInVoice from "./utils/function/updateUsersInVoice";
import { registerCommands, registerEvents } from "./utils/registry";
require("dotenv").config();

const allIntents = [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_INTEGRATIONS,
	Intents.FLAGS.GUILD_WEBHOOKS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MESSAGE_TYPING,
	Intents.FLAGS.DIRECT_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
];
const client = new DiscordClient({
	intents: allIntents,
});

(async () => {
	client.prefix = "!";
	await registerCommands(client, "../commands");
	await registerEvents(client, "../events");
	await client.login(process.env["TOKEN"]);

	/* Updating the users in voice every hour. */
	setInterval(() => updateUsersInVoice({ client }), 1000 * 60 * 60);

	/* Update server data every minute */
	setInterval(async () => {
		await updateGuildData(client);
		await updateUsersData(client);
		await addRolesToDatabase({ client });
	}, 1000 * 60);
})();
