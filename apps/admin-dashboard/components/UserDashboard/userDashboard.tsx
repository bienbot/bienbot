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
import { GuildData, UserData } from "@bienbot/types";
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
import {
    StyledWrapper,
    StyledUserDataWrapper,
    StyledHeading,
    StyledUserWrapper,
    StyledEventsWrapper,
    StyledCardsWrapper,
} from "./userDashboard.style";
import { format } from "date-fns";

type Props = {
    guildData: GuildData;
};

const UserDashboard = ({ guildData }: Props) => {
    const router = useRouter();
    const userId = router.query.userId as string;
    const userData =
        guildData.users[userId] ??
        ({
            avatar: "",
            createdAt: 0,
            username: "",
            presence: "offline",
            roles: [],
            joinedAt: new Date(),
            boostingSince: null,
        } as UserData);
    const messages = getUserMessages(guildData, userId);
    const events = getUserEvents(guildData, userId);
    const boostingSince = format(
        convertToDate(userData.boostingSince),
        "dd/MM/yyyy"
    );

    return (
        <StyledWrapper>
            <StyledUserWrapper>
                <StyledUserDataWrapper>
                    <StyledHeading>User data</StyledHeading>
                    <UserStatus user={userData} />
                    <StyledCardsWrapper>
                        <StatisticsPanel
                            heading=""
                            href=""
                            statistics={[
                                {
                                    label: "Messages sent",
                                    text: messages.length.toString(),
                                },
                                {
                                    label: "Hours spent in VC",
                                    text: calculateTotalVoiceTime(
                                        guildData.data.voicePresence,
                                        userId
                                    ).toString(),
                                },
                                {
                                    label: "Boosting since",
                                    text: userData.boostingSince
                                        ? boostingSince.toString()
                                        : "Not boosting",
                                },
                            ]}
                        />
                    </StyledCardsWrapper>
                </StyledUserDataWrapper>
                <Chart
                    heading="Last 14 days"
                    href="/"
                    chartData={{
                        hourValues: getHourCountForEveryDay(
                            guildData.data.voicePresence,
                            14,
                            userId
                        ),
                        messageValues: getMessageCountForEveryDay(
                            guildData.data.messages,
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
            </StyledUserWrapper>
            <StyledEventsWrapper>
                <CardsPanel heading="Recent events" href="asd">
                    {shapeEventData(events)
                        .slice(0, 5)
                        .map((eventData, i) => (
                            <EventCard {...eventData} key={i} />
                        ))}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="asd">
                    {messages.slice(0, 5).map((messageData) => {
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

export { UserDashboard };
