import { Story, Meta } from "@storybook/react";
import { MessageCardProps } from "../MessageCard";
import { MessagesPanel, MessagesPanelProps } from "./index";

export default {
    component: MessagesPanel,
    title: "MessagesPanel",
} as Meta;

export const Template: Story<MessagesPanelProps> = (args) => (
    <MessagesPanel {...args} />
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
    channel: { id: "", name: "general" },
    time: "23:36",
};

const messages: MessageCardProps[] = new Array(4).fill(exampleMessage);

Template.args = {
    heading: "Recent messages",
    href: "",
    messages,
};
