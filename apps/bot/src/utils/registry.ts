const path = require("path");
import { promises as fs } from "fs";
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
import { SlashCommandBuilder } from "@discordjs/builders";
import DiscordClient from "../client/client";
import BaseCommand from "./structures/BaseCommand";
import BaseEvent from "./structures/BaseEvent";
import config from "../config";
import { Option } from "./types";

const slashCommands: SlashCommandBuilder[] = [];

export async function registerCommands(client: DiscordClient, dir = "") {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
        if (
            file.endsWith(".js") &&
            !file.endsWith(".js.map") &&
            !file.endsWith(".d.ts")
        ) {
            const { default: Command } = await import(
                path.join(filePath, file)
            );
            if (Command.prototype instanceof BaseCommand) {
                const cmd = new Command();
                const slash = new SlashCommandBuilder()
                    .setName(cmd.name)
                    .setDescription(cmd.description);
                cmd.options.forEach((option: Option) => {
                    switch (option.type) {
                        case "string":
                            slash.addStringOption((o) =>
                                o
                                    .setName(option.name)
                                    .setDescription(option.description)
                                    .setRequired(option.required)
                            );
                    }
                });
                slashCommands.push(slash);
                client.commands.set(cmd.name, cmd);
                cmd.aliases.forEach((alias: string) => {
                    client.commands.set(alias, cmd);
                });
            }
        }
    }

    const rest = new REST({ version: "9" }).setToken(config.token);

    try {
        // await rest.put(
        //     Routes.applicationGuildCommands(config.clientId, config.guildId),
        //     {
        //         body: slashCommands,
        //     }
        // );
    } catch (err) {
        console.error(err);
    }
}

export async function registerEvents(client: DiscordClient, dir = "") {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    console.log(files);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
        if (
            file.endsWith(".js") &&
            !file.endsWith(".js.map") &&
            !file.endsWith(".d.ts")
        ) {
            const { default: Event } = await import(path.join(filePath, file));
            if (Event.prototype instanceof BaseEvent) {
                const event = new Event();
                client.events.set(event.name, event);
                client.on(event.name, event.run.bind(event, client));
            }
        }
    }
}
