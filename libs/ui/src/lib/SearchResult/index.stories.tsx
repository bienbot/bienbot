import { Story, Meta } from "@storybook/react";
import { SearchResult, SearchResultProps } from "./index";
import { GoMail } from "react-icons/go";

export default {
    component: SearchResult,
    title: "SearchResult",
    argTypes: {
        icon: {
            options: ["icon", "image"],
            control: {
                type: "select",
            },
        },
    },
} as Meta;

export const Template: Story<SearchResultProps> = (args) => {
    const icon =
        args.icon === "icon" ? (
            <GoMail />
        ) : (
            <img
                src="https://via.placeholder.com/32x32"
                width={32}
                height={32}
                alt=""
            />
        );

    return <SearchResult {...args} icon={icon} />;
};

Template.args = {
    children: "",
    href: "",
};
