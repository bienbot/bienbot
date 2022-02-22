import { getDays } from "@bienbot/functions";
import { Story, Meta } from "@storybook/react";
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
    minuteLabel: string;
    messageLabel: string;
    heading: string;
    href: boolean;
}

const chartTemplateData = {
    minuteValues: Array.from(
        { length: 30 },
        () => Math.floor(Math.random() * 1000) + 1000
    ),
    messageValues: Array.from(
        { length: 30 },
        () => Math.floor(Math.random() * 1000) + 100
    ),
};

export const Template: Story<StoryArgs> = (args) => {
    const { numberOfDays, minuteLabel, messageLabel, href, ...props } = args;

    const chartData = {
        minuteValues: chartTemplateData.minuteValues.slice(0, numberOfDays),
        messageValues: chartTemplateData.messageValues.slice(0, numberOfDays),
        dayValues: getDays(numberOfDays),
        labels: {
            minuteLabel,
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
    minuteLabel: "Minutes",
    messageLabel: "Messages",
    heading: "Last 30 days",
    href: true,
};
