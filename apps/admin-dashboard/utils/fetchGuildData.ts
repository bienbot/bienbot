import { supabase } from "../services/supabase";

const fetchGuildData = async ({ guildId }: { guildId: string }) => {
    const guildData = {
        name: "",
        id: guildId,
        messages: [],
        members: [],
        channels: [],
        events: [],
        voicePresences: [],
    };

    const fetchMessages = supabase
        .from(`messages`)
        .select()
        .match({ guild: guildId })
        .then(({ data }) => {
            guildData.messages = data;
        });

    const fetchMembers = supabase
        .from(`members`)
        .select()
        .match({ guild: guildId })
        .then(({ data }) => {
            guildData.members = data;
        });

    const fetchChannels = supabase
        .from(`channels`)
        .select()
        .match({ guild: guildId })
        .then(({ data }) => {
            guildData.channels = data;
        });

    const fetchEvents = supabase
        .from(`events`)
        .select()
        .match({ guild: guildId })
        .then(({ data }) => {
            guildData.events = data;
        });

    const fetchVoicePresences = supabase
        .from(`voicePresences`)
        .select()
        .match({ guild: guildId })
        .then(({ data }) => {
            guildData.voicePresences = data;
        });

    const fetchGuildInfo = supabase
        .from(`guilds`)
        .select()
        .match({ id: guildId })
        .then(({ data }) => {
            guildData.name = data[0].name;
        });

    const promises = [
        fetchMessages,
        fetchMembers,
        fetchChannels,
        fetchEvents,
        fetchVoicePresences,
        fetchGuildInfo,
    ];

    await Promise.all(promises);

    return guildData;
};

export { fetchGuildData };
