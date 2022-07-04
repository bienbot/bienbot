import * as React from "react";
import type { NextPage } from "next";
import styled from "styled-components";
import { supabase } from "../services/supabase";
import { ServerList } from "@bienbot/ui";
import { checkRequiredGuildRole } from "../utils/checkRequiredGuildRole";
import { useDispatch } from "react-redux";
import { setInitialData } from "../features/guild/guildSlice";

const ServersPage: NextPage<{ guilds: any[] }> = ({ guilds }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(
            setInitialData({
                messages: [],
                events: [],
                voicePresences: [],
                members: [],
                id: "",
                name: "",
                channels: [],
                roles: [],
            })
        );
    }, []);

    return (
        <StyledWrapper>
            <h2>Available servers</h2>
            <div>
                <ServerList servers={guilds} />
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

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req);
    const guilds = [];

    if (!user) {
        return {
            props: {},
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }

    const discordId = user.identities.find((i) => i.provider === "discord")?.id;
    if (discordId) {
        const { data: memberData, error } = await supabase
            .from("members")
            .select("guild, id");
        if (error) console.error(error);

        if (memberData) {
            const memberGuilds = memberData.filter((m) => m.id === discordId);
            if (memberGuilds) {
                for (const data of memberGuilds) {
                    const {
                        data: [guildData],
                    } = await supabase
                        .from("guilds")
                        .select()
                        .eq("id", `${data.guild}`);

                    if (
                        await checkRequiredGuildRole({
                            guildId: guildData.id,
                            discordId,
                        })
                    ) {
                        guilds.push({
                            id: guildData.id,
                            serverName: guildData.name,
                            imageSrc: guildData.icon
                                ? `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.png`
                                : `https://via.placeholder.com/100x100`,
                            href: `/guilds/${guildData.id}`,
                        });
                    }
                }
            }
        }
    }

    return { props: { guilds } };
}
