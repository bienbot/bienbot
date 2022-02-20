import { Story, Meta } from "@storybook/react";
import { MessageCard, MessageCardProps } from "./index";

export default {
    component: MessageCard,
    title: "MessageCard",
} as Meta;

export const Template: Story<MessageCardProps> = (args) => (
    <MessageCard {...args} />
);

Template.args = {
    user: {
        displayName: "mulirus",
        discordTag: "milosz#6729",
        id: "",
    },
    messageContent: ` Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    Voluptatem aperiam ut maxime recusandae voluptates praesentium
    reprehenderit earum rem fugit molestias ipsum voluptatibus
    facere, animi incidunt dolorum dignissimos quasi aliquid!
    Tempora?`,
    channel: { id: "", name: "general" },
    time: "23:36",
};
