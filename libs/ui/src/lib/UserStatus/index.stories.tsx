import { MemberData } from "@bienbot/types";
import { Meta, Story } from "@storybook/react";

import { mockGuildData } from "../../utils/mockGuildData";

import UserStatus from ".";

export default {
	component: UserStatus,
	title: "UserStatus",
	argTypes: {
		presence: {
			control: {
				type: "select",
				options: ["online", "idle", "dnd", "offline", "invisible"],
			},
		},
		user: {
			table: {
				disable: true,
			},
		},
	},
} as Meta;

const templateUser: MemberData = mockGuildData.members[0];

export const Template: Story = (args) => {
	const user = templateUser;
	user.username = args["username"];
	user.displayName = args["displayName"];
	user.discriminator = args["discriminator"];
	user.presence = args["presence"] as
		| "online"
		| "idle"
		| "dnd"
		| "offline"
		| "invisible";

	return <UserStatus user={user} />;
};

Template.args = {
	presence: "online",
	username: "Username",
	displayName: "Display name",
	discriminator: "1234",
};
