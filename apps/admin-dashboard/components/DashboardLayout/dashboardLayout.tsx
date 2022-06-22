import { GuildData } from "@bienbot/types";
import { Sidebar, TopBar } from "@bienbot/ui";
import { selectGuild } from "apps/admin-dashboard/features/guildData/guildDataSlice";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const router = useRouter();
    const guildData = useSelector(selectGuild);

    return (
        <>
            <div style={{ display: "flex" }}>
                <Sidebar
                    logoText="Bien"
                    href={`/`}
                    buttons={[
                        {
                            text: "Dashboard",
                            icon: <StyledIcon>D</StyledIcon>,
                            href: `/guilds/${guildData.serverInfo.id}`,
                            isActive: router.pathname === "/guilds/[guildId]",
                        },
                        {
                            text: "Messages",
                            icon: <StyledIcon>M</StyledIcon>,
                            href: `/guilds/${guildData.serverInfo.id}/messages`,
                            isActive: router.pathname.includes(
                                "/guilds/[guildId]/messages"
                            ),
                        },
                        {
                            text: "Events",
                            icon: <StyledIcon>E</StyledIcon>,
                            href: `/guilds/${guildData.serverInfo.id}/events`,
                            isActive: false,
                        },
                        {
                            text: "Channels",
                            icon: <StyledIcon>C</StyledIcon>,
                            href: `/guilds/${guildData.serverInfo.id}/channels`,
                            isActive: false,
                        },
                        {
                            text: "Leaderboards",
                            icon: <StyledIcon>L</StyledIcon>,
                            href: `/guilds/${guildData.serverInfo.id}/leaderboards`,
                            isActive: false,
                        },
                        {
                            text: "Members",
                            icon: <StyledIcon>M</StyledIcon>,
                            href: `/guilds/${guildData.serverInfo.id}/members`,
                            isActive: false,
                        },
                    ]}
                />
                <div style={{ marginLeft: 80, width: "100%" }}>
                    <TopBar
                        serverId={guildData.serverInfo.id}
                        serverName={guildData.serverInfo.name}
                    />
                    <div
                        style={{
                            paddingLeft: 32,
                            paddingRight: 32,
                            paddingTop: 80,
                            fontFamily: "Outfit",
                            width: "100%",
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

// Temporary component, change to react-icons later
const StyledIcon = styled.div`
    font-family: Outfit;
`;

export default DashboardLayout;
