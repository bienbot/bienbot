import {
    getMostActiveTextUsers,
    getMostActiveVoiceUsers,
} from "@bienbot/functions";
import { GuildData } from "@bienbot/types";
import { UserLeaderboard } from "@bienbot/ui";
import * as React from "react";
import styled from "styled-components";

const LeaderboardPanel = ({ guildData }: { guildData: GuildData }) => {
    return (
        <StyledWrapper>
            <UserLeaderboard
                text="hours"
                guildId={guildData.data.id}
                heading="Voice channels"
                users={getMostActiveVoiceUsers(
                    guildData.channelStats,
                    guildData.users,
                    5
                )}
            />
            <UserLeaderboard
                guildId={guildData.data.id}
                text="messages"
                heading="Text channels"
                users={getMostActiveTextUsers(
                    guildData.messages,
                    guildData.users,
                    5
                )}
            />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
    gap: 16px;
    grid-column: 1/2;
`;

export { LeaderboardPanel };
