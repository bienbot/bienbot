import { renderWithTheme } from "../../utils/renderWithTheme";

import UserLeaderboardCard from "./index";

const props = {
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    displayName: "DisplayName",
    discordTag: "DiscordTag#1234",
    position: 1111,
    hours: 8069,
    href: "",
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
        expect(baseElement).toContainHTML("DisplayName");
    });
    it("should render discordtag", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toContainHTML("DiscordTag#1234");
    });
    it("should render position", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toContainHTML("1111");
    });
    it("should render hours", () => {
        const { baseElement } = renderWithTheme(
            <UserLeaderboardCard {...props} />
        );
        expect(baseElement).toContainHTML("8069");
    });
});
