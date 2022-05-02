import styled from "styled-components";
import Link from "next/link";

export interface SidebarButtonProps {
    text: string;
    icon: JSX.Element;
    href: string;
}

export function SidebarButton(props: SidebarButtonProps) {
    return (
        <Link href={props.href} passHref>
            <StyledSidebarButton>
                <StyledIcon>{props.icon}</StyledIcon>
                <StyledText>{props.text}</StyledText>
            </StyledSidebarButton>
        </Link>
    );
}

const StyledSidebarButton = styled.a`
    display: grid;
    place-items: center;
    height: 70px;
    width: 70px;
    background-color: ${({ theme }) => theme.colors.background};
    border: none;
    border-radius: 16px;
    transition: background-color 0.1s ease-out;
    text-decoration: none;
    cursor: pointer;

    :hover,
    :focus-visible {
        background-color: ${({ theme }) => theme.colors.primary[100]};
    }

    :active {
        background-color: ${({ theme }) => theme.colors.primary[200]};
    }
`;

const StyledText = styled.span`
    max-width: 100%;
    font-size: ${({ theme }) => theme.font.size.xsmall};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.colors.primary[700]};
    text-overflow: ellipsis;
    white-space: pre-line;
    overflow: hidden;
`;

const StyledIcon = styled.div`
    height: 40px;
    padding: 0;
    margin: 0;
    font-size: 40px;
    color: ${({ theme }) => theme.colors.primary[600]};
`;

export default SidebarButton;
