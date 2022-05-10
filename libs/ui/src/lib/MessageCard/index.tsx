import styled from "styled-components";
import { format } from "date-fns";
import { MessageData } from "@bienbot/types";
import { convertToDate } from "@bienbot/functions";
import OptionalLinkWrapper from "../OptionalLinkWrapper";

export function MessageCard(props: MessageData) {
    const time = format(convertToDate(props.timestamp), "HH:mm");
    return (
        <StyledMessageCard>
            <StyledImage src={props.author.avatar}></StyledImage>
            <StyledInfoContainer>
                <OptionalLinkWrapper href={props.author.href}>
                    <StyledUserInfo as={props.author.href ? "a" : "div"}>
                        <StyledHighlight>
                            {props.author.displayName}
                        </StyledHighlight>
                        <StyledDiscordTag>
                            {props.author.username}#{props.author.discriminator}
                        </StyledDiscordTag>
                    </StyledUserInfo>
                </OptionalLinkWrapper>
                <StyledMessageInfo>
                    <span>in</span>
                    <OptionalLinkWrapper href={props.channel.href}>
                        <StyledChannelName
                            as={props.channel.href ? "a" : "div"}
                        >
                            #{props.channel.name}
                        </StyledChannelName>
                    </OptionalLinkWrapper>
                    <span>at</span>
                    <StyledHighlight>{time}</StyledHighlight>
                </StyledMessageInfo>
            </StyledInfoContainer>
            <StyledMessage>{props.content.text}</StyledMessage>
        </StyledMessageCard>
    );
}

const StyledHighlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[400]};
    font-weight: 700;
`;
const StyledDiscordTag = styled.span`
    color: ${({ theme }) => theme.colors.primary[300]};
`;

const StyledChannelName = styled.a`
    color: ${({ theme }) => theme.colors.primary[400]};
    font-weight: 700;
    text-decoration: none;
`;

const StyledInfoContainer = styled.div`
    color: ${({ theme }) => theme.colors.primary[500]};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 8px;
`;

const StyledUserInfo = styled.a`
    display: block;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    text-decoration: none;
`;

const StyledMessageInfo = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    word-break: break-word;
`;

const StyledMessage = styled.div`
    color: ${({ theme }) => theme.colors.primary[500]};
    margin-left: 8px;
    margin-top: 4px;
`;

const StyledImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    grid-row: 1/-1;
    grid-column: 1/2;
`;

const StyledMessageCard = styled.div`
    font-size: ${({ theme }) => theme.font.small};
    font-family: ${({ theme }) => theme.font.family};
    background-color: ${({ theme }) => theme.colors.primary[100]};
    padding: 14px;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 32px 1fr;
    grid-template-rows: auto auto;
`;

export default MessageCard;
