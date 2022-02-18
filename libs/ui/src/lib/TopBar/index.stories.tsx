import { Story, Meta } from "@storybook/react";
import { TopBar, TopBarProps } from "./index";

export default {
    component: TopBar,
    title: "TopBar",
} as Meta;

const Template: Story<TopBarProps> = (args) => <TopBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    serverName: "Server name",
};
