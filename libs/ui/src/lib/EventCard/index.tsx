import { convertToDate } from "@bienbot/functions";
import { EventData } from "@bienbot/types";
import format from "date-fns/format";
import styled from "styled-components";
import OptionalLinkWrapper from "../OptionalLinkWrapper";
import UserInfo from "../UserInfo";

export function EventCard(props: EventData) {
    const date = format(convertToDate(props.event.timestamp), "hh:mm");

    return (
        <StyledEventCard>
            <OptionalLinkWrapper href={props.user.href}>
                <StyledUserInfo
                    direction="row"
                    imageSrc={props.user.imageSrc}
                    displayName={props.user.displayName}
                    discordTag={props.user.discordTag}
                />
            </OptionalLinkWrapper>
            <StyledEventInfo>
                {props.event.description}{" "}
                <OptionalLinkWrapper href={props.event.targetHref}>
                    <StyledHighlight as={props.event.targetHref ? "a" : "span"}>
                        {props.event.target}{" "}
                    </StyledHighlight>
                </OptionalLinkWrapper>
                at
                <StyledHighlight> {date}</StyledHighlight>
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
    text-decoration: none;
`;

const StyledEventTarget = styled.a`
    text-decoration: none;
    cursor: pointer;
`;

export default EventCard;
