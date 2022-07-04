import { supabase } from "apps/admin-dashboard/services/supabase";

const checkRequiredGuildRole = async ({
    guildId,
    discordId,
}: {
    guildId: string;
    discordId: string;
}) => {
    const {
        data: [guildData],
        error: guildError,
    } = await supabase.from("guilds").select().eq("id", `${guildId}`);
    if (guildError) console.error(guildError);

    const {
        data: [memberData],
        error: memberError,
    } = await supabase
        .from("members")
        .select()
        .match({
            guild: `${guildId}`,
            id: `${discordId}`,
        });
    if (memberError) console.error(memberError);

    const requiredRole = guildData?.accessRole;
    if (!requiredRole) return true;

    return memberData?.roles.includes(requiredRole);
};

export { checkRequiredGuildRole };
