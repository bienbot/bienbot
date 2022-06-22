import {
    EventData,
    GuildData,
    MessageData,
    VoicePresenceData,
} from "@bienbot/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyGuildData } from "./emptyGuildDataObject";

export interface CounterState {
    availableGuilds: [];
    selectedGuild: GuildData;
}

const initialState: CounterState = {
    availableGuilds: [],
    selectedGuild: emptyGuildData as GuildData,
};

export const guildData = createSlice({
    name: "guildData",
    initialState,
    reducers: {
        updateGuild: (state, action: PayloadAction<Partial<GuildData>>) => {
            state.selectedGuild = {
                ...state.selectedGuild,
                ...action.payload,
            };
        },
        updateData: (state, action: PayloadAction<UpdateDataPayload>) => {
            state.selectedGuild = {
                ...state.selectedGuild,
                data: {
                    ...state.selectedGuild.data,
                    [action.payload.id]: action.payload.data,
                },
            };
        },
    },
});

type UpdateDataPayload = {
    id: "messages" | "events" | "voicePresence";
    data: Record<string, EventData | MessageData | VoicePresenceData>;
};

export const { updateGuild, updateData } = guildData.actions;

export const selectGuild = (state: any) => state.data.selectedGuild;

export default guildData.reducer;
