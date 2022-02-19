import { Story, Meta } from "@storybook/react";
import { LoginButton, LoginButtonProps } from "./index";

export default {
    component: LoginButton,
    title: "LoginButton",
} as Meta;

export const Template: Story<LoginButtonProps> = (args) => (
    <LoginButton {...args} />
);

Template.args = {
    text: "Log in with Discord",
    authEndpoint: "",
};
