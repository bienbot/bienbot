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
            <StyledTopBarHeader aria-hidden style={{ visibility: "hidden" }}>
                {name}
            </StyledTopBarHeader>
        </StyledTopBar>
    );
}

const StyledTopBar = styled.div`
    margin: 0;
    padding: 11px;
    min-height: 80px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary[200]};
    display: grid;
    background-color: ${({ theme }) => theme.colors.background};
    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
    grid-template-columns: max-content 1fr auto;
    gap: 16px;
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
