import Link from "next/link";
import styled from "styled-components";
import MessageCard, { MessageCardProps } from "../MessageCard";

/* eslint-disable-next-line */
export interface MessagesPanelProps {
    messages: MessageCardProps[];
    heading: string;
    href: string;
}

export function MessagesPanel(props: MessagesPanelProps) {
    return (
        <StyledMessagesPanel>
            <StyledHeadingContainer>
                <StyledHeading>{props.heading}</StyledHeading>
                <Link href={props.href}>
                    <StyledSeeMore>See more</StyledSeeMore>
                </Link>
            </StyledHeadingContainer>
            <StyledMessagesPanel>
                {props.messages.map((message) => (
                    <MessageCard key={message.time} {...message} />
                ))}
            </StyledMessagesPanel>
        </StyledMessagesPanel>
    );
}

const StyledHeadingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const StyledSeeMore = styled.a`
    font-size: ${({ theme }) => theme.font.size.large};
    font-family: ${({ theme }) => theme.font.family};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary[400]};
    cursor: pointer;
`;

const StyledHeading = styled.h2`
    font-size: ${({ theme }) => theme.font.size.large};
    font-family: ${({ theme }) => theme.font.family};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary[700]};
`;
const StyledMessagesPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export default MessagesPanel;
