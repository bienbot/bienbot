import { Meta, Story } from "@storybook/react";

import { ServerProps } from "../Server";

import { ServerList, ServerListProps } from "./index";

export default {
	component: ServerList,
	title: "ServerList",
} as Meta;

export const Template: Story<ServerListProps> = (args) => (
	<ServerList {...args} />
);

const server = {
	imageSrc:
		"https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
	serverName: "Test Server",
	href: "",
};

const servers: ServerProps[] = new Array(4).fill(0).map((_, i) => {
	return {
		...server,
		href: `${i + 1}`,
	};
});

Template.args = {
	servers,
};
