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
import produce from "immer";
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
                            const newEventData = produce(eventData, (draft) => {
                                draft.user.href = `/guilds/${guildData.serverInfo.id}/users/${eventData.user.id}`;
                                draft.event.targetHref = `/guilds/${guildData.serverInfo.id}/users/${eventData.event.targetId}`;
                            });

                            return (
                                <EventCard
                                    {...newEventData}
                                    key={
                                        newEventData.event.targetId +
                                        newEventData.user.id
                                    }
                                />
                            );
                        })}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="">
                    {getGuildMessages(guildData)
                        .slice(0, 5)
                        .map((messageData) => {
                            const newMessageData = produce(
                                messageData,
                                (draft) => {
                                    draft.author.href = `/guilds/${guildData.serverInfo.id}/users/${messageData.author.id}`;
                                    draft.channel.href = `/guilds/${guildData.serverInfo.id}/channels/${messageData.channel.id}`;
                                }
                            );

                            return (
                                <MessageCard
                                    {...newMessageData}
                                    key={newMessageData.id}
                                />
                            );
                        })}
                </CardsPanel>
            </StyledEventsWrapper>
        </StyledWrapper>
    );
};

export { GuildDashboard };
