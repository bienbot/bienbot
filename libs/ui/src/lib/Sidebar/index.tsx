import Link from "next/link";
import styled from "styled-components";
import SidebarButton, { SidebarButtonProps } from "../SidebarButton";

export interface SidebarProps {
    buttons: SidebarButtonProps[];
    logoText: string;
    href: string;
}

export function Sidebar(props: SidebarProps) {
    return (
        <StyledSidebar>
            <Link href={props.href} passHref>
                <StyledLogo>{props.logoText}</StyledLogo>
            </Link>
            <StyledButtonsContainer>
                {props.buttons.map((button) => (
                    <SidebarButton key={button.href} {...button} />
                ))}
            </StyledButtonsContainer>
        </StyledSidebar>
    );
}

const StyledSidebar = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 24px;
    max-width: 80px;
    height: 100%;
    padding: 4px 0;
    background-color: ${({ theme }) => theme.colors.background};
`;

const StyledButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;

const StyledLogo = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 16px;
    color: ${({ theme }) => theme.colors.primary[700]};
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.black};
    text-decoration: none;
    cursor: pointer;
`;

export default Sidebar;
