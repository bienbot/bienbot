import { Client, ClientOptions, Collection } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import BaseCommand from "../utils/structures/BaseCommand";
import { Player } from "discord-player";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
require("dotenv").config();

const supabaseUrl = "https://hwljvreyautrqwyyassp.supabase.co";
const supabaseKey = process.env["SUPABASE_SERVICE_ROLE"];
if (!supabaseKey) {
    throw new Error(
        "No supabase key found. Please set the SUPABASE_SERVICE_ROLE environment variable."
    );
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default class DiscordClient extends Client {
    private _commands = new Collection<string, BaseCommand>();
    private _events = new Collection<string, BaseEvent>();
    private _prefix: string = "!";
    private _database: SupabaseClient = supabase;
    private _player: Player = new Player(this, {
        ytdlOptions: {
            quality: "highestaudio",
            filter: "audioonly",
            requestOptions: {
                headers: {
                    Cookie: process.env["YT_COOKIES"],
                },
            },
        },
    });

    constructor(options: ClientOptions, cookies: string) {
        super(options);
        require("dotenv").config();
    }

    get commands(): Collection<string, BaseCommand> {
        return this._commands;
    }
    set commands(commands: Collection<string, BaseCommand>) {
        this._commands = commands;
    }
    get player(): Player {
        return this._player;
    }
    get events(): Collection<string, BaseEvent> {
        return this._events;
    }
    get prefix(): string {
        return this._prefix;
    }
    set prefix(prefix: string) {
        this._prefix = prefix;
    }

    get database(): SupabaseClient {
        return this._database;
    }
}
