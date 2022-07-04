import * as React from "react";
import { useRouter } from "next/router";
import { GuildData } from "@bienbot/types";
import { format } from "date-fns";
import { sortByTimestampAndSlice } from "apps/admin-dashboard/utils/sortByTimestampAndSlice";
import {
    getHourCountForEveryDay,
    getMessageCountForEveryDay,
    getDays,
} from "@bienbot/functions";
import {
    CardsPanel,
    EventCard,
    MessageCard,
    Chart,
    StatisticsPanel,
    UserStatus,
} from "@bienbot/ui";
import {
    StyledWrapper,
    StyledUserDataWrapper,
    StyledHeading,
    StyledUserWrapper,
    StyledEventsWrapper,
    StyledCardsWrapper,
} from "./userDashboard.style";

type Props = {
    guildData: GuildData;
};

const UserDashboard = ({ guildData }: Props) => {
    const router = useRouter();
    const memberId = router.query.userId as string;
    const member = guildData.members.find((user) => user.id === memberId);
    const messages = guildData.messages.filter(
        (message) => message.author === `${memberId}-${guildData.id}`
    );
    const events = guildData.events.filter(
        (event) => event.member === `${memberId}-${guildData.id}`
    );
    const voicePresences = guildData.voicePresences.filter(
        (presence) => presence.member === `${memberId}-${guildData.id}`
    );
    const boostingSince = member.boostingSince
        ? format(new Date(member.boostingSince), "dd/MM/yyyy")
        : null;

    return (
        <StyledWrapper>
            <StyledUserWrapper>
                <StyledUserDataWrapper>
                    <StyledHeading>User data</StyledHeading>
                    <UserStatus user={member} />

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
                                    text: voicePresences.length.toString(),
                                },
                                {
                                    label: "Boosting since",
                                    text: boostingSince ?? "Not boosting",
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
                            voicePresences,
                            14,
                            memberId
                        ),
                        messageValues: getMessageCountForEveryDay(
                            messages,
                            14,
                            memberId
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
                    {sortByTimestampAndSlice(events).map((eventData, i) => (
                        <EventCard event={eventData} member={member} key={i} />
                    ))}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="asd">
                    {sortByTimestampAndSlice(messages).map((messageData) => {
                        const channel = guildData.channels.find(
                            (channel) => channel.id === messageData.channel
                        );
                        return (
                            <MessageCard
                                message={messageData}
                                author={member}
                                channel={channel}
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
