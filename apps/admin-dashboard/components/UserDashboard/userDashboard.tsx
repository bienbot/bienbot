import * as React from "react";
import {
    getDays,
    getHourCountForEveryDay,
    getMessageCountForEveryDay,
} from "@bienbot/functions";
import { GuildData } from "@bienbot/types";
import {
    CardsPanel,
    Chart,
    EventCard,
    MessageCard,
    StatisticsPanel,
    UserStatus,
} from "@bienbot/ui";
import { format } from "date-fns";
import { useRouter } from "next/router";

import { sortByTimestampAndSlice } from "../../utils/sortByTimestampAndSlice";

import {
    StyledCardsWrapper,
    StyledEventsWrapper,
    StyledHeading,
    StyledUserDataWrapper,
    StyledUserWrapper,
    StyledWrapper,
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
