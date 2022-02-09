const { Client, Intents } = require("discord.js");
import { registerCommands, registerEvents } from "./utils/registry";
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

(async () => {
    client.commands = new Map();
    client.events = new Map();
    client.prefix = "!";
    await registerCommands(client, "../commands");
    await registerEvents(client, "../events");
    await client.login(
        "ODM0ODAyNTU5Mjg1NDYwOTk5.YIGMeA.jvCFMg1V_-Z5s-TJfNtEqmUbF1c"
    );
})();
