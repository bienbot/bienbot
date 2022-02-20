import styled from "styled-components";
import Image from "next/image";

type Direction = "row" | "column";

export interface UserInfoProps {
    imageSrc: string;
    discordTag: string;
    displayName: string;
    direction: Direction;
}

export function UserInfo(props: UserInfoProps) {
    return (
        <StyledUserInfo>
            <StyledImageContainer>
                <Image
                    src={props.imageSrc}
                    unoptimized
                    width="32px"
                    height="32px"
                    layout="fixed"
                    alt={props.discordTag}
                    priority
                />
            </StyledImageContainer>
            <StyledUserInfoContainer direction={props.direction}>
                <StyledDiscordTag>{props.discordTag}</StyledDiscordTag>
                <StyledUserName>{props.displayName}</StyledUserName>
            </StyledUserInfoContainer>
        </StyledUserInfo>
    );
}

const StyledUserInfo = styled.div`
    display: flex;
    align-items: center;
    min-width: 194px;
    max-height: 32px;
`;

const StyledImageContainer = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
`;

const StyledUserInfoContainer = styled.div<{
    direction: Direction;
}>`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) =>
        props.direction === "row" ? "row-reverse" : "column"};
    width: fit-content;
    margin-left: 8px;
    font-size: ${({ theme }) => theme.font.small};
    font-family: ${({ theme }) => theme.font.family};
    min-width: 0;
`;

const StyledUserName = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary[400]};
    margin-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledDiscordTag = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary[300]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default UserInfo;
