import { Story, Meta } from "@storybook/react";
import { UserInfo, UserInfoProps } from "./index";

export default {
    component: UserInfo,
    title: "UserInfo",
} as Meta;

export const Template: Story<UserInfoProps> = (args) => <UserInfo {...args} />;

Template.args = {
    src: "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    userName: "Text",
    discordId: "Text#2137",
};
