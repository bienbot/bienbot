import {
    getHourCountForEveryDay,
    getMessageCountForEveryDay,
    getDays,
    shapeEventData,
    getGuildMessages,
    getServerStatistics,
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
import {
    StyledUsersDataWrapper,
    StyledUsersWrapper,
    StyledWrapper,
    StyledEventsWrapper,
} from "./guildDashboard.style";

type Props = {
    guildData: GuildData;
};

const GuildDashboard = ({ guildData }: Props) => {
    const statistics = getServerStatistics(guildData);

    return (
        <StyledWrapper>
            <StyledUsersWrapper>
                <StyledUsersDataWrapper>
                    <StatisticsPanel
                        heading="Server statistics"
                        href="/"
                        statistics={statistics}
                    />
                </StyledUsersDataWrapper>
                <Chart
                    heading="Last 14 days"
                    href="/"
                    chartData={{
                        hourValues: getHourCountForEveryDay(
                            guildData.data.voicePresence,
                            14
                        ),
                        messageValues: getMessageCountForEveryDay(
                            guildData.data.messages,
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
            </StyledUsersWrapper>
            <StyledEventsWrapper>
                <CardsPanel heading="Recent events" href="">
                    {shapeEventData(guildData)
                        .slice(0, 5)
                        .map((eventData) => {
                            eventData.user.href = `/guilds/${guildData.serverInfo.id}/users/${eventData.user.id}`;
                            eventData.event.targetHref = `/guilds/${guildData.serverInfo.id}/users/${eventData.event.targetId}`;
                            return (
                                <EventCard
                                    {...eventData}
                                    key={
                                        eventData.event.targetId +
                                        eventData.user.id
                                    }
                                />
                            );
                        })}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="">
                    {getGuildMessages(guildData)
                        .slice(0, 5)
                        .map((messageData) => {
                            messageData.author.href = `/guilds/${guildData.serverInfo.id}/users/${messageData.author.id}`;
                            messageData.channel.href = `/guilds/${guildData.serverInfo.id}/channels/${messageData.channel.id}`;

                            return (
                                <MessageCard
                                    {...messageData}
                                    key={messageData.id}
                                />
                            );
                        })}
                </CardsPanel>
            </StyledEventsWrapper>
        </StyledWrapper>
    );
};

export { GuildDashboard };
