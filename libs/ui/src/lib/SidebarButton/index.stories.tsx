import { Story, Meta } from "@storybook/react";
import { SidebarButton, SidebarButtonProps } from "./index";
import { GoMail } from "react-icons/go";

export default {
    component: SidebarButton,
    title: "SidebarButton",
} as Meta;

export const Template: Story<SidebarButtonProps> = (args) => (
    <SidebarButton {...args} />
);

Template.args = {
    text: "Text",
    icon: <GoMail />,
    href: "",
    isActive: true,
};
