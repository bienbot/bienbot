import { EventData, MemberData } from "@bienbot/types";
import format from "date-fns/format";
import styled from "styled-components";
import OptionalLinkWrapper from "../OptionalLinkWrapper";
import UserInfo from "../UserInfo";

export type EventCardProps = {
    event: EventData;
    member: MemberData;
};

export function EventCard(props: EventCardProps) {
    const { event, member } = props;

    return (
        <StyledEventCard>
            <OptionalLinkWrapper
                href={`${event.guild}/users/${event.member.split("-")[0]}`}
            >
                <StyledUserContainer as={member.id ? "a" : "div"}>
                    <StyledUserInfo
                        direction="row"
                        imageSrc={member.avatar}
                        displayName={member.displayName}
                        discordTag={member.discriminator}
                    />
                </StyledUserContainer>
            </OptionalLinkWrapper>
            <StyledEventInfo>
                {props.event.description}{" "}
                <OptionalLinkWrapper
                    href={`${event.guild}/channels/${event.targetId}`}
                >
                    <StyledHighlight as={event.id ? "a" : "span"}>
                        {event.target}{" "}
                    </StyledHighlight>
                </OptionalLinkWrapper>
                at{" "}
                <StyledHighlight>
                    {format(new Date(event.timestamp), "dd/MM HH:mm")}
                </StyledHighlight>
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

const StyledUserContainer = styled.a`
    text-decoration: unset;
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

export default EventCard;
