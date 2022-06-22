import { EventData, GuildData } from "@bienbot/types";

export const getGuildEvents = (guildData: GuildData): EventData[] => {
    const eventData: EventData[] = Object.values(guildData.data.events);

    return eventData.sort(
        (a, b) =>
            b.event.timestamp.seconds +
            b.event.timestamp.nanoseconds / 1000000000 -
            (a.event.timestamp.seconds +
                a.event.timestamp.nanoseconds / 1000000000)
    );
};
