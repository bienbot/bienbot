import * as React from "react";
import { UserDashboard } from "apps/admin-dashboard/components/UserDashboard";
import DashboardLayout from "apps/admin-dashboard/components/DashboardLayout/dashboardLayout";
import { supabase } from "apps/admin-dashboard/services/supabase";
import { checkRequiredGuildRole } from "apps/admin-dashboard/utils/checkRequiredGuildRole";
import { fetchGuildData } from "apps/admin-dashboard/utils/fetchGuildData";
import { GuildData } from "@bienbot/types";
import { useRealtimeListener } from "apps/admin-dashboard/features/guild/useRealtimeListener";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectGuild } from "apps/admin-dashboard/features/guild/guildSlice";

const UserDashboardPage = ({ initialGuildData }) => {
    const router = useRouter();
    const guildId = router.query.guildId as string;
    useRealtimeListener({
        guildId,
        initialData: initialGuildData as GuildData,
    });
    const guildData = useSelector(selectGuild);

    if (!guildData.id) return null;

    return (
        <>
            <DashboardLayout guildData={guildData}>
                <UserDashboard guildData={guildData} />
            </DashboardLayout>
        </>
    );
};

export async function getServerSideProps({ req, query }) {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    if (user) {
        const discordId = user.identities.find(
            (i) => i.provider === "discord"
        )?.id;
        if (discordId) {
            const hasAccess = await checkRequiredGuildRole({
                guildId: query.guildId,
                discordId,
            });
            if (hasAccess) {
                /* Fetch server data from the database */
                const guildData = await fetchGuildData({
                    guildId: query.guildId,
                });

                return {
                    props: {
                        initialGuildData: guildData,
                    },
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
}

export default UserDashboardPage;
