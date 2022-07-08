import { GoMail } from "react-icons/go";
import { Meta, Story } from "@storybook/react";

import { SidebarButton, SidebarButtonProps } from "./index";

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
