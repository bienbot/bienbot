import * as React from "react";
import { fetchGuildData, getServerStatistics } from "@bienbot/functions";
import { GuildData } from "@bienbot/types";
import { GuildDashboard } from "apps/admin-dashboard/components/GuildDashboard";
import firebaseApp from "apps/admin-dashboard/services/firebase";
import DashboardLayout from "apps/admin-dashboard/components/DashboardLayout/dashboardLayout";

type Props = {
    guildData: GuildData;
};

const GuildDashboardPage = ({ guildData }: Props) => {
    return (
        <>
            <GuildDashboard guildData={guildData} />
        </>
    );
};

export async function getServerSideProps({ params }) {
    const guildData = await fetchGuildData(params.guildId, firebaseApp);

    // Pass data to the page via props
    return { props: { guildData } };
}

GuildDashboardPage.getLayout = function getLayout(page: React.ReactElement) {
    const { props } = page;
    return (
        <>
            <DashboardLayout guildData={props.guildData}>
                {page}
            </DashboardLayout>
        </>
    );
};

export default GuildDashboardPage;
