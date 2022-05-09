import styled from "styled-components";
import OptionalLinkWrapper from "../OptionalLinkWrapper";

export interface MessageCardProps {
    user: {
        discordTag: string;
        displayName: string;
        id: string;
        imageSrc: string;
        href?: string;
    };
    message: {
        content: string;
        id: string;
    };
    channel: {
        name: string;
        id: string;
        href?: string;
    };
    time: string;
}

export function MessageCard({
    user,
    channel,
    time,
    message,
}: MessageCardProps) {
    return (
        <StyledMessageCard>
            <StyledImage src={user.imageSrc}></StyledImage>
            <StyledInfoContainer>
                <OptionalLinkWrapper href={user.href}>
                    <StyledUserInfo as={channel.href ? "a" : "div"}>
                        <StyledHighlight>{user.displayName}</StyledHighlight>
                        <StyledDiscordTag>{user.discordTag}</StyledDiscordTag>
                    </StyledUserInfo>
                </OptionalLinkWrapper>
                <StyledMessageInfo>
                    <span>in</span>
                    <OptionalLinkWrapper href={channel.href}>
                        <StyledChannelName as={channel.href ? "a" : "div"}>
                            #{channel.name}
                        </StyledChannelName>
                    </OptionalLinkWrapper>
                    <span>at</span>
                    <StyledHighlight>{time}</StyledHighlight>
                </StyledMessageInfo>
            </StyledInfoContainer>
            <StyledMessage>{message.content}</StyledMessage>
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
