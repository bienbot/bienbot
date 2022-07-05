import { renderWithTheme } from "../../utils/renderWithTheme";
import { mockGuildData } from "../../utils/mockGuildData";

import UserLeaderboardCard from "./index";
import { getMostActiveTextUsers } from "@bienbot/functions";

const mockMember = getMostActiveTextUsers(
    mockGuildData.messages,
    mockGuildData.members,
    5
)[0];

const props = {
    position: 1,
    text: "messages",
    ...mockMember,
};

describe("UserLeaderboardCard", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render displayName", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toContainHTML("testUserDisplayName");
    });
    it("should render discordtag", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toContainHTML("testUserName#7777");
    });
    it("should render position", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toContainHTML("1");
    });
    it("should render messages", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toContainHTML("1");
    });
});
