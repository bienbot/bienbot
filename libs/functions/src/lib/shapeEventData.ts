import { EventData, GuildData } from "@bienbot/types";
import { getGuildEvents } from "./getGuildEvents";

export const shapeEventData = (
    guildData: GuildData | EventData[]
): EventData[] => {
    const eventsData =
        guildData instanceof Array ? guildData : getGuildEvents(guildData);

    const formedEventData = eventsData
        .sort(
            (a, b) =>
                b.event.timestamp.seconds +
                b.event.timestamp.nanoseconds / 1000000000 -
                (a.event.timestamp.seconds +
                    a.event.timestamp.nanoseconds / 1000000000)
        )
        .map((event) => {
            return {
                user: {
                    imageSrc: event.user.imageSrc,
                    displayName: event.user.displayName,
                    discordTag: event.user.discordTag,
                    id: event.user.id,
                    href: "",
                },
                event: {
                    type: event.event.type,
                    target: event.event.target,
                    targetId: event.event.targetId,
                    targetHref: "",
                    description: event.event.description,
                    timestamp: event.event.timestamp,
                },
            };
        });

    return formedEventData;
};
