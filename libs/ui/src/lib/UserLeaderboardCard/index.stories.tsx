import { Story, Meta } from "@storybook/react";
import { mockGuildData } from "../../utils/mockGuildData";
import { UserLeaderboardCard, UserLeaderboardCardProps } from "./index";

export default {
    component: UserLeaderboardCard,
    title: "UserLeaderboardCard",
} as Meta;

const user = mockGuildData.members[0];

export const Template: Story<UserLeaderboardCardProps> = (args) => (
    <UserLeaderboardCard {...args} />
);

Template.args = {
    imageSrc: user.avatar,
    displayName: user.displayName,
    discordTag: user.discriminator,
    username: user.username,
    position: 1,
    count: 8069,
    text: "hours",
    href: "",
};
