import { GoMail } from "react-icons/go";
import { Meta, Story } from "@storybook/react";

import { SidebarButtonProps } from "../SidebarButton";

import { Sidebar, SidebarProps } from "./index";

export default {
	component: Sidebar,
	title: "Sidebar",
} as Meta;

export const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

const button = {
	text: "Text",
	icon: <GoMail />,
	href: "",
	isActive: false,
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
