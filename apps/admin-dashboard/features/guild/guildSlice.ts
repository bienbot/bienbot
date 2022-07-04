import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    ChannelData,
    EventData,
    MessageData,
    GuildData,
    VoicePresenceData,
    RoleData,
    MemberData,
} from "@bienbot/types";

export const guildSlice = createSlice({
    name: "guild",
    initialState: {
        messages: [],
        events: [],
        voicePresences: [],
        members: [],
        id: "",
        name: "",
    },
    reducers: {
        addOrUpdateMessage: (state, action: PayloadAction<MessageData>) => {
            const index = state.messages.findIndex(
                (message) => message.id === action.payload.id
            );
            if (index !== -1) {
                /* Replace message if there is already one with the same id */
                state.messages[index] = action.payload;
            } else {
                /* Add message if there is no message with the same id */
                state.messages.push(action.payload);
            }
        },
        addEvent: (state, action: PayloadAction<EventData>) => {
            state.events = [...state.events, action.payload];
        },
        addVoicePresence: (state, action: PayloadAction<VoicePresenceData>) => {
            state.voicePresences = [...state.voicePresences, action.payload];
        },
        updateChannel: (state, action: PayloadAction<ChannelData>) => {
            const index = state.channels.findIndex(
                (channel) => channel.id === action.payload.id
            );
            if (index !== -1) {
                /* Replace channel if there is already one with the same id */
                state.channels[index] = action.payload;
            } else {
                /* Add channel if there is no channel with the same id */
                state.channels.push(action.payload);
            }
        },
        addOrUpdateRole: (state, action: PayloadAction<RoleData>) => {
            const index = state.roles.findIndex(
                (role) => role.id === action.payload.id
            );
            if (index !== -1) {
                /* Replace role if there is already one with the same id */
                state.roles[index] = action.payload;
            } else {
                /* Add role if there is no role with the same id */
                state.roles.push(action.payload);
            }
        },
        addOrUpdateMember: (state, action: PayloadAction<MemberData>) => {
            const index = state.members.findIndex(
                (member) => member.id === action.payload.id
            );
            if (index !== -1) {
                /* Replace member if there is already one with the same id */
                state.members[index] = action.payload;
            } else {
                /* Add member if there is no member with the same id */
                state.members.push(action.payload);
            }
        },
        updateGuildData: (state, action: PayloadAction<{ name: string }>) => {
            state.name = action.payload.name;
        },
        setInitialData: (state, action: PayloadAction<GuildData>) => {
            return { ...action.payload };
        },
    },
});

export const {
    addOrUpdateMessage,
    addEvent,
    addVoicePresence,
    addOrUpdateRole,
    updateChannel,
    updateGuildData,
    addOrUpdateMember,
    setInitialData,
} = guildSlice.actions;

export const selectGuild = (state) => state.data as GuildData;

export default guildSlice.reducer;
