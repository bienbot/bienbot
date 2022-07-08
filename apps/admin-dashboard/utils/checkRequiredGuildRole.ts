import { GuildData, MemberData } from "@bienbot/types";

import { supabase } from "../services/supabase";

const checkRequiredGuildRole = async ({
    guildId,
    discordId,
}: {
    guildId: string;
    discordId: string;
}) => {
    let guild: GuildData | undefined;
    let member: MemberData | undefined;

    const fetchGuild = supabase
        .from("guilds")
        .select()
        .eq("id", `${guildId}`)
        .single()
        .then(({ data }) => {
            guild = data;
        });
    const fetchMember = supabase
        .from("members")
        .select()
        .match({
            guild: `${guildId}`,
            id: `${discordId}`,
        })
        .single()
        .then(({ data }) => {
            member = data;
        });

    const promises = [fetchGuild, fetchMember];
    await Promise.all(promises);

    const requiredRole = guild?.accessRole;
    if (!requiredRole) return true;

    return member?.roles.includes(requiredRole);
};

export { checkRequiredGuildRole };
