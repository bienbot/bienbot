import * as React from "react";
import { fetchGuildData } from "@bienbot/functions";
import { GuildData } from "@bienbot/types";
import { UserDashboard } from "apps/admin-dashboard/components/UserDashboard";
import firebaseApp from "apps/admin-dashboard/services/firebase";
import DashboardLayout from "apps/admin-dashboard/components/DashboardLayout/dashboardLayout";

type Props = {
    guildData: GuildData;
};

const UserDashboardPage = ({ guildData }: Props) => {
    return (
        <>
            <UserDashboard guildData={guildData} />
        </>
    );
};

export async function getServerSideProps({ params }) {
    const guildData = await fetchGuildData(params.guildId, firebaseApp);

    // Pass data to the page via props
    return { props: { guildData } };
}

UserDashboardPage.getLayout = function getLayout(page: React.ReactElement) {
    const { props } = page;
    return (
        <>
            <DashboardLayout guildData={props.guildData}>
                {page}
            </DashboardLayout>
        </>
    );
};

export default UserDashboardPage;
