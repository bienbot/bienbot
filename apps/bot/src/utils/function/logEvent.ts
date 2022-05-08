import { User } from "discord.js";
import DiscordClient from "../../client/client";

const admin = require("firebase-admin");
const database = admin.firestore();

type EventType = "messageCreate" | "messageDelete";

interface LogEvent {
    eventTarget: string;
    eventTargetId: string;
    guildId: string | null;
    eventTime: Date;
    eventDescription: string;
    eventMember?: User;
    eventType: EventType;
    client: DiscordClient;
}

const logEvent = async ({
    eventTarget,
    eventDescription,
    eventTargetId,
    eventTime,
    guildId,
    eventMember,
    eventType,
    client,
}: LogEvent) => {
    const events = await database.collection(guildId).doc("events").get();
    const eventsData = events.exists ? events.data() : {};

    const guild = client.guilds.cache.get(guildId ?? "");
    if (eventMember) {
        const member = await guild?.members.fetch(eventMember);

        if (!member) return;
    }

    const eventData = {
        imageSrc: eventMember?.avatarURL(),
        displayName: eventMember?.username,
        discordTag: eventMember?.discriminator,
        description: eventDescription,
        target: eventTarget,
        targetHref: eventTargetId,
        time: eventTime,
        type: eventType,
    };

    const eventArray = eventsData[eventType]
        ? [...eventsData[eventType], eventData]
        : [eventData];

    const newEventsData = {
        ...eventsData,
        [eventType]: eventArray,
    };

    await database.collection(guildId).doc("events").set(newEventsData);
};

export default logEvent;
