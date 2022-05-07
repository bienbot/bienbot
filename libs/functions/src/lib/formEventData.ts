import { GuildData } from "@bienbot/types";
import convertToDate from "./convertToDate";

export const formEventData = (guildData: GuildData) => {
    const eventData = [];
    Object.values(guildData.events).forEach((events) => {
        eventData.push(...events);
    });
    const formedEventData = eventData
        .sort((a, b) => b.time - a.time)
        .map((event) => ({
            imageSrc: event.imageSrc,
            displayName: event.displayName,
            discordTag: event.discordTag,
            eventDescription: event.description,
            eventTarget: event.target,
            eventTargetHref: event.targetHref,
            eventTime: `${convertToDate(event.time).getHours()}:${convertToDate(
                event.time
            ).getMinutes()}`,
        }));

    return formedEventData;
};
