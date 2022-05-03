import { Story, Meta } from "@storybook/react";
import { Sidebar, SidebarProps } from "./index";
import { SidebarButtonProps } from "../SidebarButton";
import { GoMail } from "react-icons/go";

export default {
    component: Sidebar,
    title: "Sidebar",
} as Meta;

export const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

const button = {
    text: "Text",
    icon: <GoMail />,
    href: "",
};

const buttons: SidebarButtonProps[] = new Array(4).fill(0).map((_, i) => {
    return {
        ...button,
        href: `${i + 1}`,
    };
});

Template.args = {
    buttons,
    logoText: "Bien",
    href: "",
};
