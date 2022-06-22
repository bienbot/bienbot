import { GuildData } from "@bienbot/types";

const getUserEvents = (guildData: GuildData, userId: string) => {
    const userEvents = Object.values(guildData.data.events).filter(
        (event) => event.user.id === userId
    );

    userEvents.sort((a, b) => {
        return (
            b.event.timestamp.seconds +
            b.event.timestamp.nanoseconds / 1000000000 -
            (a.event.timestamp.seconds +
                a.event.timestamp.nanoseconds / 1000000000)
        );
    });
    return userEvents;
};

export { getUserEvents };
