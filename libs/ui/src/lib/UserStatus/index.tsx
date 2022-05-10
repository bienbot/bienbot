import * as React from "react";
import { UserData } from "@bienbot/types";
import styled from "styled-components";

export type UserStatusProps = {
    user: UserData;
};

const UserStatus = (props: UserStatusProps) => {
    return (
        <UserStatusContainer>
            <AvatarContainer>
                <StyledImage src={props.user.avatar} width={48} height={48} />
                {["online", "idle", "dnd"].includes(props.user.presence) && (
                    <PresenceStatusDot presence={props.user.presence} />
                )}
            </AvatarContainer>
            <TextContainer>
                <DisplayName>{props.user.displayName} </DisplayName>
                <Text>
                    {props.user.username}#{props.user.discriminator}
                </Text>
            </TextContainer>
        </UserStatusContainer>
    );
};

const UserStatusContainer = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
`;

const TextContainer = styled.div`
    margin-left: 8px;
`;

const DisplayName = styled.span`
    font-size: 20px;
    font-weight: 800;
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.colors.primary[400]};
`;

const Text = styled.span`
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.colors.primary[500]};
    font-size: 20px;
`;

const AvatarContainer = styled.div`
    position: relative;
`;

const StyledImage = styled.img`
    border-radius: 50%;
`;

const PresenceStatusDot = styled.div<{
    presence: "online" | "idle" | "dnd" | "offline" | "invisible";
}>`
    position: absolute;
    background-color: ${({ presence }) => {
        switch (presence) {
            case "online":
                return "#5aa364";
            case "idle":
                return "#eeac42";
            case "dnd":
                return "#db504c";
            default:
                return "transparent";
        }
    }};
    width: 20px;
    height: 20px;
    right: 0;
    bottom: 4px;
    border-radius: 50%;
    border: 2px solid #fff;
    transition: color 0.1s ease-in-out;
`;

export default UserStatus;
