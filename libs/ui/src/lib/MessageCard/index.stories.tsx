import { MessageData } from "@bienbot/types";
import { Story, Meta } from "@storybook/react";
import { MessageCard } from "./index";

export default {
    component: MessageCard,
    title: "MessageCard",
} as Meta;

export const Template: Story<MessageData> = (args) => <MessageCard {...args} />;

Template.args = {
    author: {
        avatar: "https://www.github.com/lkarasinski.png",
        displayName: "Display Name",
        discriminator: "1234",
        id: "12345678",
        username: "Username",
    },
    content: {
        text: ` Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Voluptatem aperiam ut maxime recusandae voluptates praesentium
        reprehenderit earum rem fugit molestias ipsum voluptatibus
        facere, animi incidunt dolorum dignissimos quasi aliquid!
        Tempora?`,
        attachments: [],
    },
    id: "1",
    timestamp: { seconds: 0, nanoseconds: 0 },
    channel: { id: "", name: "general" },
};
