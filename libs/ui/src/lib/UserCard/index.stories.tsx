import { Meta, Story } from "@storybook/react";

import { UserCard, UserCardProps } from "./index";

export default {
	component: UserCard,
	title: "UserCard",
} as Meta;

export const Template: Story<UserCardProps> = (args) => <UserCard {...args} />;

Template.args = {
	imageSrc:
		"https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
	displayName: "Text",
	discordTag: "Text#2137",
	direction: "row",
	href: "/",
	presence: "online",
};
