import DiscordClient from "./client/client";
import { Intents } from "discord.js";
import { registerCommands, registerEvents } from "./utils/registry";
import updateUsersInVoice from "./utils/function/updateUsersInVoice";
import updateUsersData from "./utils/function/updateUsersData";
import adminConfig from "../adminConfig";
import updateGuildData from "./utils/function/updateGuildData";
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
const client = new DiscordClient(
    {
        intents: allIntents,
    },
    "cookies"
);

const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
});

(async () => {
    client.prefix = "!";
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await client.login(process.env["TOKEN"]);
    updateUsersData(client);
    /* 
    Update users in voice channels every hour; This is not ideal, beacuse we loose "accuracy"
    but current database (firestore) gets really slow when we have a lot of entries.
    In the future we might switch to a Redis database, and update the users every minute.
    */
    setInterval(() => updateUsersInVoice(client), 1000 * 60 * 60);
    /* */
    setInterval(() => updateGuildData(client), 1000 * 60);
})();
