import * as React from "react";
import type { NextPage } from "next";
import useUserAuthData from "../utils/useUserAuthData";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../services/firebase";
import { ServerList } from "@bienbot/ui";
import styled from "styled-components";

const database = getFirestore(firebaseApp);

const ServersPage: NextPage<{ botGuilds: string[] }> = ({ botGuilds }) => {
    const userData = useUserAuthData();
    const userGuilds = userData.guilds ?? [];

    const servers = React.useMemo(() => {
        const sharedGuilds = userGuilds.filter((guild) =>
            botGuilds.includes(guild.id)
        );
        const guildsData = sharedGuilds.map((guild) => ({
            imageSrc: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
            serverName: guild.name,
            href: `/guilds/${guild.id}`,
        }));
        return guildsData;
    }, [userData.id]);

    if (!userData.id) {
        return null;
    }

    return (
        <StyledWrapper>
            <h2>Available servers</h2>
            <div>
                <ServerList servers={servers} />
            </div>
        </StyledWrapper>
    );
};

export default ServersPage;

const StyledWrapper = styled.div`
    font-family: "Outfit", sans-serif;

    h2 {
        font-size: 24px;
        color: ${({ theme }) => theme.colors.primary[700]};
    }
`;

export async function getServerSideProps() {
    const dataSnap = await getDoc(doc(database, "data", "guilds"));
    const botGuilds = dataSnap.data().currentGuilds;
    return { props: { botGuilds } };
}
