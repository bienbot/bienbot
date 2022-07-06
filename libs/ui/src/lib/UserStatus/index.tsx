import * as React from "react";
import { MemberData } from "@bienbot/types";
import styled from "styled-components";

export type UserStatusProps = {
    user: MemberData;
};

export const UserStatus = (props: UserStatusProps) => {
    return (
        <UserStatusContainer>
            <AvatarContainer>
                <StyledImage
                    src={
                        props.user.avatar ??
                        "data:image/png;base64,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"
                    }
                    width={48}
                    height={48}
                />
                {["online", "idle", "dnd", "offline", "invisible"].includes(
                    props.user.presence
                ) && <PresenceStatusDot presence={props.user.presence} />}
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
                return "grey";
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
