import {
    getHourCountForEveryDay,
    getMessageCountForEveryDay,
    getDays,
    shapeEventData,
    shapeMessagesData,
} from "@bienbot/functions";
import { GuildData } from "@bienbot/types";
import {
    StatisticsPanel,
    CardsPanel,
    EventCard,
    MessageCard,
    Chart,
} from "@bienbot/ui";
import * as React from "react";
import { LeaderboardPanel } from "../LeaderboardPanel";
import { StyledWrapper } from "./guildDashboard.style";

type Props = {
    guildData: GuildData;
    statistics: any;
};

const GuildDashboard = ({ guildData, statistics }: Props) => {
    return (
        <StyledWrapper>
            <div style={{ minWidth: 0 }}>
                <StatisticsPanel
                    heading="Server statistics"
                    href="/"
                    statistics={statistics}
                />

                <Chart
                    heading="Last 14 days"
                    href="/"
                    chartData={{
                        hourValues: getHourCountForEveryDay(
                            guildData.channelStats,
                            14
                        ),
                        messageValues: getMessageCountForEveryDay(
                            guildData.messages,
                            14
                        ),
                        labels: {
                            messageLabel: "Messages",
                            hourLabel: "Hours",
                        },
                        dayValues: getDays(14),
                    }}
                />

                <LeaderboardPanel guildData={guildData} />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardsPanel heading="Recent events" href="">
                    {shapeEventData(guildData)
                        .slice(0, 5)
                        .map((eventData) => (
                            <EventCard {...eventData} />
                        ))}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="">
                    {shapeMessagesData(guildData)
                        .slice(0, 5)
                        .map((messageData) => {
                            messageData.user.href = `/guilds/${guildData.data.id}/user/${messageData.user.id}`;
                            messageData.channel.href = `/guilds/${guildData.data.id}/channels/${messageData.channel.id}`;

                            return (
                                <MessageCard
                                    {...messageData}
                                    key={messageData.message.id}
                                />
                            );
                        })}
                </CardsPanel>
            </div>
        </StyledWrapper>
    );
};

export { GuildDashboard };
