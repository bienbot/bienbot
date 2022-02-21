import { Story, Meta } from "@storybook/react";
import { UserLeaderboardCard, UserLeaderboardCardProps } from "./index";

export default {
    component: UserLeaderboardCard,
    title: "UserLeaderboardCard",
} as Meta;

export const Template: Story<UserLeaderboardCardProps> = (args) => (
    <UserLeaderboardCard {...args} />
);

Template.args = {
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    displayName: "Text",
    discordTag: "Text#2137",
    position: 1,
    minutes: 8069,
    href: "",
};
