import * as React from "react";
import type { NextPage } from "next";
import { TopBar } from "@bienbot/ui";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import { getGuildMessages, getServerStatistics } from "@bienbot/functions";
import { GuildData } from "@bienbot/types";

import firebaseApp from "apps/admin-dashboard/services/firebase";
import { GuildDashboard } from "apps/admin-dashboard/components/GuildDashboard";
const database = getFirestore(firebaseApp);

type Props = {
    guildData: GuildData;
    guildId: string;
};

const GuildDashboardPage: NextPage<Props> = ({ guildData, guildId }) => {
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
    // Fetch data from firestore
    const dataSnap = await getDocs(collection(database, params.guildId));
    const result = {};
    dataSnap.forEach((doc) => {
        result[doc.id] = doc.data();
    });

    const guildData: GuildData = JSON.parse(JSON.stringify(result));

    // Pass data to the page via props
    return { props: { guildData, guildId: params.guildId } };
}

export default GuildDashboardPage;
