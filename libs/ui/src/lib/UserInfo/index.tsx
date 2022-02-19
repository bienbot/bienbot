import styled from "styled-components";
import Image from "next/image";

export interface UserInfoProps {
    src: string;
    discordId: string;
    userName: string;
    direction: "row" | "column";
}

export function UserInfo(props: UserInfoProps) {
    return (
        <StyledUserInfo>
            <StyledImageContainer>
                <Image
                    src={props.src}
                    unoptimized
                    width="32px"
                    height="32px"
                    layout="fixed"
                    alt={props.discordId}
                    priority
                />
            </StyledImageContainer>
            <StyledUserInfoContainer direction={props.direction}>
                <StyledUserName>{props.userName}</StyledUserName>
                <StyledDiscordId>{props.discordId}</StyledDiscordId>
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
    overflow: hidden;
`;

const StyledUserInfoContainer = styled.div<{
    direction: "row" | "column";
}>`
    display: flex;
    flex-direction: ${(props) => props.direction};
    width: fit-content;
    margin-left: 8px;
    font-size: ${({ theme }) => theme.font.small};
    font-family: ${({ theme }) => theme.font.family};
`;

const StyledUserName = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary[400]};
    margin-right: 4px;
`;

const StyledDiscordId = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary[300]};
`;

export default UserInfo;
