import { ApplicationCommandOptionType } from "discord-api-types";

export interface Option {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required: boolean;
}
