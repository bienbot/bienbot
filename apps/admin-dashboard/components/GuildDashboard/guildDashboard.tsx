import * as React from "react";
import { useRouter } from "next/router";
import { LeaderboardPanel } from "../LeaderboardPanel";
import { GuildData } from "@bienbot/types";
import { sortByTimestampAndSlice } from "apps/admin-dashboard/utils/sortByTimestampAndSlice";
import {
    getHourCountForEveryDay,
    getMessageCountForEveryDay,
    getDays,
    getServerStatistics,
} from "@bienbot/functions";
import {
    StatisticsPanel,
    CardsPanel,
    EventCard,
    MessageCard,
    Chart,
} from "@bienbot/ui";
import {
    StyledUsersDataWrapper,
    StyledUsersWrapper,
    StyledWrapper,
    StyledEventsWrapper,
} from "./guildDashboard.style";

const GuildDashboard = ({ guildData }: { guildData: GuildData }) => {
    const router = useRouter();
    const guildId = router.query.guildId as string;
    const { messages, channels, members, events } = guildData;
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
                            guildData.voicePresences,
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
            </StyledUsersWrapper>
            <StyledEventsWrapper>
                <CardsPanel heading="Recent events" href="">
                    {sortByTimestampAndSlice(events).map((event) => {
                        const member = members.find(
                            (member) =>
                                `${member.id}-${guildId}` === event.member
                        );
                        return (
                            <EventCard
                                key={event.id}
                                event={event}
                                member={member}
                            />
                        );
                    })}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="">
                    {sortByTimestampAndSlice(messages).map((message) => {
                        const author = members.find(
                            (user) => `${user.id}-${guildId}` === message.author
                        );
                        const channel = channels.find(
                            (channel) => channel.id === message.channel
                        );
                        return (
                            <MessageCard
                                key={message.id}
                                message={message}
                                author={author}
                                channel={channel}
                            />
                        );
                    })}
                </CardsPanel>
            </StyledEventsWrapper>
        </StyledWrapper>
    );
};

export { GuildDashboard };
