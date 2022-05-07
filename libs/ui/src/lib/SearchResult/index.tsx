import Link from "next/link";
import styled from "styled-components";

export interface SearchResultProps {
    icon: React.ReactNode;
    children: React.ReactNode;
    href: string;
}

export function SearchResult(props: SearchResultProps) {
    return (
        <Link href={props.href} passHref>
            <StyledSearchResult>
                <StyledIconWrapper>{props.icon}</StyledIconWrapper>
                <StyledChildrenWrapper>{props.children}</StyledChildrenWrapper>
            </StyledSearchResult>
        </Link>
    );
}

const StyledSearchResult = styled.a`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: start;
    max-width: 468px;
    padding: 10px;
    background-color: transparent;
    border-radius: 8px;
    font-family: ${({ theme }) => theme.font.family};
    text-decoration: none;
    transition: background-color 0.1s linear;
    cursor: pointer;

    :hover {
        background-color: ${({ theme }) => theme.colors.primary[200]};
    }
`;

const StyledIconWrapper = styled.div`
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 50%;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.primary[600]};
    overflow: hidden;
`;

const StyledChildrenWrapper = styled.div`
    width: 100%;
    margin-left: 8px;
`;

export default SearchResult;
