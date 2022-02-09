const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
import { promises as fs } from "fs";
import { SlashCommandBuilder } from "@discordjs/builders";
import DiscordClient from "../client/client";
import BaseCommand from "./structures/BaseCommand";
import BaseEvent from "./structures/BaseEvent";
import config from "../config";

export async function registerCommands(client: DiscordClient, dir = "") {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    const commands = [];
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
        if (file.endsWith(".js")) {
            const { default: Command } = await import(
                path.join(filePath, file)
            );
            if (Command.prototype instanceof BaseCommand) {
                const cmd = new Command();
                const slash = new SlashCommandBuilder()
                    .setName(cmd.name)
                    .setDescription(cmd.description);
                commands.push(slash);
                client.commands.set(cmd.name, cmd);
                cmd.aliases.forEach((alias: string) => {
                    client.commands.set(alias, cmd);
                });
            }
        }
    }

    const rest = new REST({ version: "9" }).setToken(config.token);

    try {
        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            {
                body: commands,
            }
        );
        console.log("Successfully registered application commands.");
    } catch (err) {
        console.error(err);
    }
}

export async function registerEvents(client: DiscordClient, dir = "") {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
        if (file.endsWith(".js")) {
            const { default: Event } = await import(path.join(filePath, file));
            console.log(Event);
            if (Event.prototype instanceof BaseEvent) {
                const event = new Event();
                client.events.set(event.name, event);
                client.on(event.name, event.run.bind(event, client));
            }
        }
    }
}
