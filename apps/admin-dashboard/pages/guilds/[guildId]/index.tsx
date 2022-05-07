import * as React from "react";
import type { NextPage } from "next";
import { TopBar } from "@bienbot/ui";
import {
    fetchGuildData,
    getGuildMessages,
    getServerStatistics,
} from "@bienbot/functions";
import { GuildData } from "@bienbot/types";
import { GuildDashboard } from "apps/admin-dashboard/components/GuildDashboard";
import firebaseApp from "apps/admin-dashboard/services/firebase";

type Props = {
    guildData: GuildData;
};

const GuildDashboardPage: NextPage<Props> = ({ guildData }) => {
    const statistics = React.useMemo(() => {
        return getServerStatistics(guildData);
    }, []);
    getGuildMessages(guildData);

    return (
        <>
            <TopBar serverName={guildData.data.name ?? ""} />
            <GuildDashboard guildData={guildData} statistics={statistics} />
        </>
    );
};

export async function getServerSideProps({ params }) {
    const guildData = await fetchGuildData(params.guildId, firebaseApp);

    // Pass data to the page via props
    return { props: { guildData } };
}

export default GuildDashboardPage;
