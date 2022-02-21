import { Story, Meta } from "@storybook/react";
import { UserLeaderboardCardProps } from "../UserLeaderboardCard";
import { UserLeaderboard, UserLeaderboardProps } from "./index";

export default {
    component: UserLeaderboard,
    title: "UserLeaderboard",
} as Meta;

export const Template: Story<UserLeaderboardProps> = (args) => (
    <UserLeaderboard {...args} />
);

const user = {
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    displayName: "Text",
    discordTag: "Text#2137",
    position: 1,
    minutes: 8069,
    href: "",
};

const users: UserLeaderboardCardProps[] = new Array(4).fill(0).map((_, i) => {
    return {
        ...user,
        href: `${i + 1}`,
    };
});

Template.args = {
    heading: "Voice channels",
    users,
};
