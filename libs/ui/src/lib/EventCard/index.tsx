import { EventData } from "@bienbot/types";
import styled from "styled-components";
import UserInfo from "../UserInfo";

export function EventCard(props: EventData) {
    return (
        <StyledEventCard>
            <StyledUserInfo
                direction="row"
                imageSrc={props.user.imageSrc}
                displayName={props.user.displayName}
                discordTag={props.user.discordTag}
            />
            <StyledEventInfo>
                {props.event.description}{" "}
                {props.event.targetHref ? (
                    <StyledEventTarget href={props.event.targetHref}>
                        <StyledHighlight>{props.event.target} </StyledHighlight>
                    </StyledEventTarget>
                ) : (
                    <StyledHighlight>{props.event.target} </StyledHighlight>
                )}
                at
                <StyledHighlight> {props.event.timestamp}</StyledHighlight>
            </StyledEventInfo>
        </StyledEventCard>
    );
}

const StyledEventCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    border-radius: 8px;
    padding: 14px;

    background-color: ${({ theme }) => theme.colors.primary[100]};
    color: ${({ theme }) => theme.colors.primary[500]};
    font-family: ${({ theme }) => theme.font.family};
`;

const StyledUserInfo = styled(UserInfo)`
    flex-wrap: wrap;
`;

const StyledEventInfo = styled.div`
    flex-wrap: wrap;
    margin-left: auto;
`;

const StyledHighlight = styled.span`
    color: ${({ theme }) => theme.colors.primary[400]};
    font-weight: 700;
`;

const StyledEventTarget = styled.a`
    text-decoration: none;
    cursor: pointer;
`;

export default EventCard;
