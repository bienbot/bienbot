import { Story, Meta } from "@storybook/react";
import { SearchResult, SearchResultProps } from "./index";
import { GoMail } from "react-icons/go";

export default {
    component: SearchResult,
    title: "SearchResult",
} as Meta;

export const Template: Story<SearchResultProps> = (args) => (
    <SearchResult {...args} />
);

Template.args = {
    icon: (
        <img
            width={32}
            height={32}
            src="https://avatars.githubusercontent.com/u/61357400?v=4"
        />
    ),
    children: "",
    href: "",
};
