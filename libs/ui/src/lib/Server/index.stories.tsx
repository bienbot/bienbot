import { Meta, Story } from "@storybook/react";

import { mockServerData } from "../../utils/mockServerData";

import { Server, ServerProps } from "./index";

export default {
	component: Server,
	title: "Server",
} as Meta;

const mockServer = mockServerData.server[0];

export const Template: Story<ServerProps> = (args) => <Server {...args} />;

Template.args = {
	imageSrc: mockServer.avatar,
	serverName: mockServer.serverName,
	href: "",
};
