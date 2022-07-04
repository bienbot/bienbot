import { supabase } from "../services/supabase";

const fetchGuildData = async ({ guildId }: { guildId: string }) => {
    const { data: messagesData } = await supabase
        .from(`messages`)
        .select("*")
        .match({ guild: guildId });

    const { data: membersData } = await supabase
        .from(`members`)
        .select("*")
        .match({ guild: guildId });

    const { data: channelsData } = await supabase
        .from(`channels`)
        .select("*")
        .match({ guild: guildId });

    const { data: eventsData } = await supabase
        .from(`events`)
        .select("*")
        .match({ guild: guildId });

    const { data: voicePresencesData } = await supabase
        .from(`voicePresences`)
        .select("*")
        .match({ guild: guildId });

    const { data: serverInfoData } = await supabase
        .from(`guilds`)
        .select("*")
        .match({ id: guildId })
        .single();

    const guildData = {
        name: serverInfoData.name,
        id: guildId,
        messages: messagesData,
        members: membersData,
        channels: channelsData,
        events: eventsData,
        voicePresences: voicePresencesData,
    };

    return guildData;
};

export { fetchGuildData };
