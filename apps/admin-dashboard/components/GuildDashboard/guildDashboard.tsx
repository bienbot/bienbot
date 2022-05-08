import {
    getHourCountForEveryDay,
    getMessageCountForEveryDay,
    getDays,
    convertToDate,
    getGuildMessages,
    formEventData,
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
    formEventData(guildData);
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
                    {formEventData(guildData)
                        .slice(0, 5)
                        .map((eventData) => (
                            <EventCard {...eventData} />
                        ))}
                </CardsPanel>
                <CardsPanel heading="Recent messages" href="">
                    {getGuildMessages(guildData)
                        .slice(0, 5)
                        .map((message) => (
                            <MessageCard
                                channel={{ name: "channel name", id: "0" }}
                                time={`${convertToDate(
                                    message.timestamp
                                ).getHours()}:${convertToDate(
                                    message.timestamp
                                ).getMinutes()}`}
                                messageContent={message.content.text}
                                messageId={message.id}
                                user={{
                                    imageSrc: message.author.avatar,
                                    displayName: message.author.displayName,
                                    discordTag: `${message.author.username}#${message.author.discriminator}`,
                                    id: message.author.id,
                                }}
                                key={message.id}
                            />
                        ))}
                </CardsPanel>
            </div>
        </StyledWrapper>
    );
};

export { GuildDashboard };
