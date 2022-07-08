import { Meta, Story } from "@storybook/react";

import { Server, ServerProps } from "./index";

export default {
	component: Server,
	title: "Server",
} as Meta;

export const Template: Story<ServerProps> = (args) => <Server {...args} />;

Template.args = {
	imageSrc:
		"https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
	serverName: "Test Server",
	href: "",
};
