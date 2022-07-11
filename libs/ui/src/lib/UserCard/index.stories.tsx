import { MemberData } from "@bienbot/types";
import { Meta, Story } from "@storybook/react";

import { mockGuildData } from "../../utils/mockGuildData";

import { UserCard, UserCardProps } from "./index";

export default {
	component: UserCard,
	title: "UserCard",
} as Meta;

const mockUser: MemberData = mockGuildData.members[0];

export const Template: Story<UserCardProps> = (args) => <UserCard {...args} />;

Template.args = {
	imageSrc: mockUser.avatar,
	displayName: mockUser.displayName,
	discordTag: mockUser.discriminator,
	username: mockUser.username,
	direction: "row",
	href: "/",
	presence: mockUser.presence,
};
