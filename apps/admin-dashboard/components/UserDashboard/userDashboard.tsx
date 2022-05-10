import {
    getHourCountForEveryDay,
    getMessageCountForEveryDay,
    getDays,
    shapeEventData,
    getUserMessages,
    convertToDate,
    calculateTotalVoiceTime,
    getUserEvents,
} from "@bienbot/functions";
import { GuildData } from "@bienbot/types";
import {
    CardsPanel,
    EventCard,
    MessageCard,
    Chart,
    StatisticsPanel,
    UserStatus,
} from "@bienbot/ui";
import { useRouter } from "next/router";
import * as React from "react";
import { StyledWrapper } from "./userDashboard.style";
import { format } from "date-fns";

type Props = {
    guildData: GuildData;
};

const UserDashboard = ({ guildData }: Props) => {
    const router = useRouter();
    const userId = router.query.userId as string;
    const userData = guildData.users[userId];
    const messages = getUserMessages(guildData, userId);
    const events = getUserEvents(guildData, userId);
    const userHoursCount = format(
        convertToDate(userData.boostingSince),
        "dd/mm/yyyy"
    );

    return (
        <StyledWrapper>
            <div style={{ minWidth: 0 }}>
                <h1>User data</h1>
                <UserStatus user={userData} />
                <StatisticsPanel
                    heading=""
                    href=""
                    statistics={[
                        {
                            label: "Messages",
                            text: messages.length.toString(),
                        },
                        {
                            label: "Hours spent in VC",
                            text: calculateTotalVoiceTime(
                                guildData.channelStats,
                                userId
                            ).toString(),
                        },
                        {
                            label: "Boosting since",
                            text: userData.boostingSince
                                ? userHoursCount.toString()
                                : "Not boosting",
                        },
                    ]}
                />
                <Chart
                    heading="Last 14 days"
                    href="/"
                    chartData={{
                        hourValues: getHourCountForEveryDay(
                            guildData.channelStats,
                            14,
                            userId
                        ),
                        messageValues: getMessageCountForEveryDay(
                            guildData.messages,
                            14,
                            userId
                        ),
                        labels: {
                            messageLabel: "Messages",
                            hourLabel: "Hours",
                        },
                        dayValues: getDays(14),
                    }}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardsPanel heading="Recent events" href="">
                    {shapeEventData(events)
                        .slice(0, 5)
                        .map((eventData, i) => (
                            <EventCard {...eventData} key={i} />
                        ))}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="">
                    {messages.slice(0, 5).map((messageData) => {
                        return (
                            <MessageCard
                                {...messageData}
                                key={messageData.id}
                            />
                        );
                    })}
                </CardsPanel>
            </div>
        </StyledWrapper>
    );
};

export { UserDashboard };
