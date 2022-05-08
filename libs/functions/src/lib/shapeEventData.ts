import { GuildData } from "@bienbot/types";
import convertToDate from "./convertToDate";
import { getGuildEvents } from "./getGuildEvents";

export const shapeEventData = (guildData: GuildData) => {
    const eventData = getGuildEvents(guildData);

    const formedEventData = eventData
        .sort(
            (a, b) =>
                b.time.seconds +
                b.time.nanoseconds / 1000000000 -
                (a.time.seconds + a.time.nanoseconds / 1000000000)
        )
        .map((event) => {
            const date = convertToDate(event.time);
            let eventHref: string;

            switch (event.type) {
                case "messageDelete":
                case "messageCreate":
                case "messageUpdate":
                    eventHref = `${guildData.data.id}/messages/${event.targetHref}`;
                    break;
                default:
                    eventHref = event.targetHref;
            }

            return {
                imageSrc: event.imageSrc,
                displayName: event.displayName,
                discordTag: event.discordTag,
                eventDescription: event.description,
                eventTarget: event.target,
                eventTargetHref: eventHref,
                eventTime: `${date.getHours()}:${
                    date.getMinutes() < 10
                        ? `0${date.getMinutes()}`
                        : date.getMinutes()
                }`,
                eventType: event.type,
            };
        });

    return formedEventData;
};
