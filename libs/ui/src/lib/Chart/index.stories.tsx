import { getDays } from "@bienbot/functions";
import { Meta, Story } from "@storybook/react";

import { Chart } from "./index";

export default {
	component: Chart,
	title: "Chart",
	argTypes: {
		numberOfDays: {
			control: { type: "range", min: 2, max: 30, step: 1 },
		},
		chartData: {
			table: { disable: true },
		},
		heading: {
			control: { type: "text", required: false },
		},
		href: {
			control: {
				type: "boolean",
			},
		},
	},
} as Meta;

interface StoryArgs {
	numberOfDays: number;
	hourLabel: string;
	messageLabel: string;
	heading: string;
	href: boolean;
}

const chartTemplateData = {
	hourValues: Array.from(
		{ length: 30 },
		() => Math.floor(Math.random() * 1000) + 1000
	),
	messageValues: Array.from(
		{ length: 30 },
		() => Math.floor(Math.random() * 1000) + 100
	),
};

export const Template: Story<StoryArgs> = (args) => {
	const { numberOfDays, hourLabel, messageLabel, href, ...props } = args;

	const chartData = {
		hourValues: chartTemplateData.hourValues.slice(0, numberOfDays),
		messageValues: chartTemplateData.messageValues.slice(0, numberOfDays),
		dayValues: getDays(numberOfDays),
		labels: {
			hourLabel,
			messageLabel,
		},
	};

	return (
		<Chart
			href={href ? "https://example.com" : ""}
			{...props}
			chartData={chartData}
		></Chart>
	);
};

Template.args = {
	numberOfDays: 10,
	hourLabel: "Hours",
	messageLabel: "Messages",
	heading: "Last 30 days",
	href: true,
};
