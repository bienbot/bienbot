import { Story, Meta } from "@storybook/react";
import { UserLeaderboardCardProps } from "../UserLeaderboardCard";
import UserStatus, { UserStatusProps } from ".";
import { UserData } from "@bienbot/types";

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

const templateUser: UserData = {
    avatar: "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    bot: false,
    createdAt: 0,
    displayColor: "#000000",
    displayName: "",
    id: "0",
    joinedAt: new Date(),
    roles: [],
    discriminator: "1234",
    username: "Username",
    presence: "online",
    boostingSince: { seconds: 0, nanoseconds: 0 },
};

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
