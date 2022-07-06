import { mockGuildData } from "../../utils/mockGuildData";
import { renderWithTheme } from "../../utils/renderWithTheme";
import { UserLeaderboardCardProps } from "../UserLeaderboardCard";
import UserLeaderboard from "./index";

const user = mockGuildData.members[0];

const users: UserLeaderboardCardProps[] = new Array(4).fill(0).map((_, i) => {
    return {
        ...user,
        href: `${i + 1}`,
        position: 1,
        count: 8069,
        text: "",
        imageSrc: user.avatar,
        discordTag: user.discriminator,
    };
});

const props = {
    users,
    heading: "Voice channels",
    text: "hours" as const,
    guildId: "",
};

describe("UserLeaderboard", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(<UserLeaderboard {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it("should render heading", () => {
        const { baseElement } = renderWithTheme(<UserLeaderboard {...props} />);
        expect(baseElement).toContainHTML("Voice channels");
    });
});
