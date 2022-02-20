import styled from "styled-components";
import UserInfo from "../UserInfo";

/* eslint-disable-next-line */
export interface EventCardProps {
    imageSrc: string;
    displayName: string;
    discordTag: string;
    eventDescription: string;
    eventTarget: string;
    eventTargetHref?: string;
    eventTime: string;
}

export function EventCard(props: EventCardProps) {
    return (
        <StyledEventCard>
            <StyledUserInfo
                direction="row"
                imageSrc={props.imageSrc}
                displayName={props.displayName}
                discordTag={props.discordTag}
            />
            <StyledEventInfo>
                {props.eventDescription}{" "}
                {props.eventTargetHref ? (
                    <StyledEventTarget href={props.eventTargetHref}>
                        <StyledHighlight>{props.eventTarget} </StyledHighlight>
                    </StyledEventTarget>
                ) : (
                    <StyledHighlight>{props.eventTarget} </StyledHighlight>
                )}
                at
                <StyledHighlight> {props.eventTime}</StyledHighlight>
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
