import * as React from "react";
import { UserDashboard } from "apps/admin-dashboard/components/UserDashboard";
import DashboardLayout from "apps/admin-dashboard/components/DashboardLayout/dashboardLayout";
import useFirebaseListener from "apps/admin-dashboard/features/guildData/useFirebaseListener";
import { useRouter } from "next/router";
import { selectGuild } from "apps/admin-dashboard/features/guildData/guildDataSlice";
import { useSelector } from "react-redux";

const UserDashboardPage = () => {
    const guildData = useSelector(selectGuild);

    const router = useRouter();
    const guildId = router.query.guildId as string;
    useFirebaseListener({ id: guildId });
    return (
        <>
            <UserDashboard guildData={guildData} />
        </>
    );
};

UserDashboardPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <>
            <DashboardLayout>{page}</DashboardLayout>
        </>
    );
};

export default UserDashboardPage;
