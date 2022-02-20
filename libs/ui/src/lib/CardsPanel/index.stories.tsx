import { Story, Meta } from "@storybook/react";
import EventCard, { EventCardProps } from "../EventCard";
import MessageCard, { MessageCardProps } from "../MessageCard";
import { CardsPanel, CardsPanelProps } from "./index";

export default {
    component: CardsPanel,
    title: "CardsPanel",
} as Meta;

export const Events: Story<CardsPanelProps> = (args) => (
    <CardsPanel {...args} />
);
export const Messages: Story<CardsPanelProps> = (args) => (
    <CardsPanel {...args} />
);

const exampleMessage = {
    user: {
        displayName: "mulirus",
        discordTag: "milosz#6729",
        id: "",
    },
    messageContent: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
Voluptatem aperiam ut maxime recusandae voluptates praesentium
reprehenderit earum rem fugit molestias ipsum voluptatibus
facere, animi incidunt dolorum dignissimos quasi aliquid!
Tempora?`,
    messageId: "",
    channel: { id: "", name: "general" },
    time: "23:36",
};

const exampleEvent = {
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    displayName: "mulirus",
    discordTag: "milosz#6729",
    eventDescription: "joined the",
    eventTarget: "server",
    eventTime: "23:36",
};

const messages = new Array(4).fill(exampleMessage);
const events = new Array(4).fill(exampleEvent);

Events.args = {
    heading: "Recent events",
    href: "",
    children: events.map((event: EventCardProps) => (
        <EventCard
            key={event.discordTag + event.displayName + event.eventTarget}
            {...event}
        />
    )),
};

Messages.args = {
    heading: "Recent messages",
    href: "",
    children: messages.map((message: MessageCardProps) => (
        <MessageCard key={message.messageId} {...message} />
    )),
};
