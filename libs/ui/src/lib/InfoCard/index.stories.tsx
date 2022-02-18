import { Story, Meta } from "@storybook/react";
import { InfoCard, InfoCardProps } from "./index";

export default {
    component: InfoCard,
    title: "InfoCard",
} as Meta;

export const Template: Story<InfoCardProps> = (args) => <InfoCard {...args} />;

Template.args = {
    label: "Text",
    text: "Text",
};
