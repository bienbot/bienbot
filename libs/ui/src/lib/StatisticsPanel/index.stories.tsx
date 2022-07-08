import { Meta, Story } from "@storybook/react";

import { StatisticsPanel, StatisticsPanelProps } from "./index";

export default {
	component: StatisticsPanel,
	title: "Statistics Panel",
} as Meta;

export const Template: Story<StatisticsPanelProps> = (args) => (
	<StatisticsPanel {...args} />
);

Template.args = {
	heading: "Server Statistics",
	statistics: [
		{
			label: "Online users",
			text: "60",
		},
		{
			label: "All members",
			text: "124",
		},
		{
			label: "Messages sent",
			text: "1895",
		},
		{
			label: "Hours spent in VC",
			text: "40345",
		},
	],
	href: "/statistics",
};
