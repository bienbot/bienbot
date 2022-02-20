import { Story, Meta } from "@storybook/react";
import { EventCard, EventCardProps } from "./index";

export default {
    component: EventCard,
    title: "Event Card",
} as Meta;

export const Template: Story<EventCardProps> = (args) => (
    <EventCard {...args} />
);

Template.args = {
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    displayName: "mulirus",
    discordTag: "milosz#6729",
    eventDescription: "joined the",
    eventTarget: "server",
    eventTime: "23:36",
};
