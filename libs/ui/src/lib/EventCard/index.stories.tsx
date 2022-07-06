import { EventData, MemberData } from "@bienbot/types";
import { Story, Meta } from "@storybook/react";
import { mockGuildData } from "../../utils/mockGuildData";
import { EventCard } from "./index";

export default {
    component: EventCard,
    title: "Event Card",
} as Meta;

const mockEvent = mockGuildData.events[0];
const mockMember = mockGuildData.members[0];

export const Template: Story = (args) => {
    const event = { ...mockEvent, ...args["event"] } as EventData;
    const member = { ...mockMember, ...args["member"] } as MemberData;

    return <EventCard event={event} member={member} />;
};

Template.args = {
    event: {
        description: mockEvent.description,
        timestamp: mockEvent.timestamp,
        target: mockEvent.target,
    },
    member: {
        avatar: mockMember.avatar,
        displayName: mockMember.displayName,
        discriminator: mockMember.discriminator,
        username: mockMember.username,
    },
};
