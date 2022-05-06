import styled from "styled-components";
import UserLeaderboardCard, {
    UserLeaderboardCardProps,
} from "../UserLeaderboardCard";

export interface UserLeaderboardProps {
    heading: string;
    users: UserLeaderboardCardProps[];
    text: "hours" | "messages";
    guildId: string;
}

export function UserLeaderboard(props: UserLeaderboardProps) {
    return (
        <StyledUserLeaderboard>
            <StyledHeading>{props.heading}</StyledHeading>
            {props.users.map((user, index) => (
                <UserLeaderboardCard
                    key={user.href}
                    {...user}
                    href={`/guilds/${props.guildId}${user.href}`}
                    position={index + 1}
                    text={props.text}
                />
            ))}
        </StyledUserLeaderboard>
    );
}

const StyledUserLeaderboard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const StyledHeading = styled.h3`
    margin-bottom: 8px;
    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.medium};
    color: ${({ theme }) => theme.colors.primary[600]};
    font-weight: 700;
`;

export default UserLeaderboard;
