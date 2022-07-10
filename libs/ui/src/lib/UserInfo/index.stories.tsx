import { MemberData } from "@bienbot/types";
import { Meta, Story } from "@storybook/react";

import { mockGuildData } from "../../utils/mockGuildData";

import { UserInfo, UserInfoProps } from "./index";

export default {
	component: UserInfo,
	title: "UserInfo",
} as Meta;

const mockUser: MemberData = mockGuildData.members[0];

export const Template: Story<UserInfoProps> = (args) => <UserInfo {...args} />;

Template.args = {
	imageSrc: mockUser.avatar,
	displayName: mockUser.displayName,
	discordTag: mockUser.discriminator,
	direction: "row",
	username: mockUser.username,
};
