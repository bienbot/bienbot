import * as React from "react";
import { GuildDashboard } from "apps/admin-dashboard/components/GuildDashboard";
import DashboardLayout from "apps/admin-dashboard/components/DashboardLayout/dashboardLayout";
import { useSelector } from "react-redux";
import { selectGuild } from "apps/admin-dashboard/features/guildData/guildDataSlice";
import useFirebaseListener from "apps/admin-dashboard/features/guildData/useFirebaseListener";
import { useRouter } from "next/router";

const GuildDashboardPage = () => {
    const guildData = useSelector(selectGuild);
    const router = useRouter();
    const guildId = router.query.guildId as string;
    useFirebaseListener({ id: guildId });

    return (
        <>
            <GuildDashboard guildData={guildData} />
        </>
    );
};

GuildDashboardPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <>
            <DashboardLayout>{page}</DashboardLayout>
        </>
    );
};

export default GuildDashboardPage;
