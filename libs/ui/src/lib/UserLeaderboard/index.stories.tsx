import { Meta, Story } from "@storybook/react";

import { mockGuildData } from "../../utils/mockGuildData";
import { UserLeaderboardCardProps } from "../UserLeaderboardCard";

import { UserLeaderboard, UserLeaderboardProps } from "./index";

export default {
	component: UserLeaderboard,
	title: "UserLeaderboard",
} as Meta;

export const Template: Story<UserLeaderboardProps> = (args) => (
	<UserLeaderboard {...args} />
);

const user = mockGuildData.members[0];

const users: UserLeaderboardCardProps[] = new Array(4).fill(0).map((_, i) => {
	return {
		position: 1,
		count: 8069,
		text: "",
		imageSrc: user.avatar,
		discordTag: user.discriminator,
		displayName: user.displayName,
		username: user.username,
		href: `${i + 1}`,
	};
});

Template.args = {
	heading: "Voice channels",
	users,
};
