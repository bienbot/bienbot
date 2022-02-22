import { Story, Meta } from "@storybook/react";
import { Chart, ChartProps } from "./index";

export default {
    component: Chart,
    title: "Chart",
} as Meta;

export const Template: Story<ChartProps> = (args) => <Chart {...args} />;

interface DateObject {
    start: Date;
    end?: Date;
}

export function getDays(x: number): Date[];
export function getDays(x: DateObject): Date[];
export function getDays(x: number | DateObject): Date[] {
    if (typeof x === "number") {
        return Array.from(
            { length: x },
            (_, i) => new Date(new Date().setDate(new Date().getDate() + i))
        );
    } else {
        const days = [];
        let current = x.start;
        const endTime = x.end ? x.end.getTime() : new Date().getTime();
        while (current.getTime() <= endTime) {
            days.push(current);
            current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
        }
        return days;
    }
}

Template.args = {
    href: "",
    minuteValues: Array.from(
        { length: 30 },
        () => Math.floor(Math.random() * 3000) + 1
    ),
    messageValues: Array.from(
        { length: 30 },
        () => Math.floor(Math.random() * 3000) + 1
    ),
    dayValues: getDays(5),
    labels: {
        firstLabel: "Minutes in VC",
        secondLabel: "Messages sent",
    },
};
