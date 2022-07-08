import * as React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import DashboardLayout from "../../../components/DashboardLayout/dashboardLayout";
import { GuildDashboard } from "../../../components/GuildDashboard";
import { selectGuild } from "../../../features/guild/guildSlice";
import { useRealtimeListener } from "../../../features/guild/useRealtimeListener";
import { supabase } from "../../../services/supabase";
import { checkRequiredGuildRole } from "../../../utils/checkRequiredGuildRole";

const GuildDashboardPage = () => {
    const router = useRouter();
    const guildId = router.query.guildId as string;
    useRealtimeListener({
        guildId,
    });
    const guildData = useSelector(selectGuild);

    if (!guildData.id) return null;

    return (
        <DashboardLayout guildData={guildData}>
            <GuildDashboard guildData={guildData} />
        </DashboardLayout>
    );
};

export const getServerSideProps = async ({ req, query }) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    if (user) {
        const discordId = user.identities.find(
            (i) => i.provider === "discord"
        )?.id;
        if (discordId) {
            const hasAccess = await checkRequiredGuildRole({
                guildId: query.guildId as string,
                discordId,
            });

            if (hasAccess) {
                return {
                    props: {},
                };
            }
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: "/login",
        },
        props: {},
    };
};

export default GuildDashboardPage;
