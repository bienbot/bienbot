import { EventData, GuildData } from "@bienbot/types";

const getUserEvents = (guildData: GuildData, userId: string) => {
    let userEvents: EventData[] = [];

    Object.values(guildData.events).forEach((eventsArray) => {
        userEvents.push(
            ...eventsArray.filter((event) => event.user.id === userId)
        );
    });

    userEvents.sort(
        (a, b) =>
            b.event.timestamp.seconds +
            b.event.timestamp.nanoseconds / 1000000000 -
            (a.event.timestamp.seconds +
                a.event.timestamp.nanoseconds / 1000000000)
    );
    return userEvents;
};

export { getUserEvents };
