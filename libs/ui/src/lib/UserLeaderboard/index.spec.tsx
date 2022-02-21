import { renderWithTheme } from "../../utils/renderWithTheme";
import { UserLeaderboardCardProps } from "../UserLeaderboardCard";
import UserLeaderboard from "./index";

const user = {
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    displayName: "Text",
    discordTag: "Text#2137",
    position: 1,
    minutes: 8069,
    href: "",
};

const users: UserLeaderboardCardProps[] = new Array(4).fill(0).map((_, i) => {
    return {
        ...user,
        href: `${i + 1}`,
    };
});

const props = {
    heading: "Voice channels",
    users,
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
