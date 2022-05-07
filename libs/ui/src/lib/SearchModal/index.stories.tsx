import { Story, Meta } from "@storybook/react";
import * as React from "react";
import SearchResult from "../SearchResult";
import { SearchModal, SearchModalProps } from "./index";

export default {
    component: SearchModal,
    title: "SearchModal",
    argTypes: {
        search: {
            table: {
                disable: true,
            },
        },
        setSearch: {
            table: {
                disable: true,
            },
        },
        children: {
            control: {
                type: "boolean",
            },
        },
    },
} as Meta;

export const Template: Story<SearchModalProps> = (args) => {
    const [search, setSearch] = React.useState("");

    return (
        <SearchModal
            children={
                args.children ? (
                    <>
                        <SearchResult
                            icon={
                                <img
                                    src="https://via.placeholder.com/32x32"
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            }
                            href=""
                        >
                            Placeholder
                        </SearchResult>
                        <SearchResult
                            icon={
                                <img
                                    src="https://via.placeholder.com/32x32"
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            }
                            href=""
                        >
                            Placeholder
                        </SearchResult>
                        <SearchResult
                            icon={
                                <img
                                    src="https://via.placeholder.com/32x32"
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            }
                            href=""
                        >
                            Placeholder
                        </SearchResult>
                    </>
                ) : null
            }
            search={search}
            setSearch={setSearch}
        />
    );
};

Template.args = {
    children: null,
};
