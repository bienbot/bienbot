import React from "react";
import styled from "styled-components";
import SearchBar from "../SearchBar";
import { useWindowSize } from "usehooks-ts";

export interface TopBarProps {
    serverName: string;
}

export function TopBar(props: TopBarProps) {
    const [searchValue, setSearchValue] = React.useState("");
    const { width } = useWindowSize();
    const name =
        props.serverName.length > 16
            ? [...props.serverName.split("")]
                  .filter((_, i) => i < 14)
                  .join("") + "..."
            : props.serverName;
    return (
        <StyledTopBar>
            <StyledTopBarHeader>
                {width >= 768 ? name : props.serverName}
            </StyledTopBarHeader>
            <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                callback={() => console.log("Clicked button")}
            />
        </StyledTopBar>
    );
}

const StyledTopBar = styled.div`
    position: fixed;
    width: calc(100vw - 80px);
    z-index: 1;
    margin: 0;
    padding: 11px;
    padding-left: 32px;
    height: 80px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary[200]};
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledTopBarHeader = styled.h1`
    font-size: ${({ theme }) => theme.font.size.xlarge};
    line-height: 40px;
    margin: auto 0;
    color: ${({ theme }) => theme.colors.primary[700]};
    font-weight: bold;
    font-family: ${({ theme }) => theme.font.family};
`;

export default TopBar;
