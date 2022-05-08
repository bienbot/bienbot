import { EventData, GuildData } from "@bienbot/types";

export const getGuildEvents = (guildData: GuildData): EventData[] => {
    const eventData = [];
    Object.values(guildData.events).forEach((events) => {
        eventData.push(...events);
    });
    return eventData.sort(
        (a, b) =>
            b.time.seconds +
            b.time.nanoseconds / 1000000000 -
            (a.time.seconds + a.time.nanoseconds / 1000000000)
    );
};
