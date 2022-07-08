import { ChannelData, MemberData, MessageData } from "@bienbot/types";
import { Meta, Story } from "@storybook/react";

import { mockGuildData } from "../../utils/mockGuildData";

import { MessageCard } from "./index";

export default {
	component: MessageCard,
	title: "MessageCard",
} as Meta;

const mockMessage = mockGuildData.messages[0];
const mockAuthor = mockGuildData.members[0];
const mockChannel = mockGuildData.channels[0];

export const Template: Story = (args) => {
	const message = { ...mockMessage, ...args["message"] } as MessageData;
	const author = { ...mockAuthor, ...args["author"] } as MemberData;
	const channel = { ...mockChannel, ...args["channel"] } as ChannelData;

	return <MessageCard message={message} author={author} channel={channel} />;
};

Template.args = {
	author: {
		avatar: mockAuthor.avatar,
		displayName: mockAuthor.displayName,
		discriminator: mockAuthor.discriminator,
		username: mockAuthor.username,
	},
	channel: {
		name: mockChannel.name,
	},
	message: {
		content: mockMessage.content,
		timestamp: mockMessage.timestamp,
	},
};
