import { MemberData } from "@bienbot/types";
import { renderWithTheme } from "../../utils/renderWithTheme";

import UserStatus from "./index";

const user: MemberData = {
    avatar: "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    bot: false,
    createdAt: 0,
    displayColor: "#000000",
    displayName: "DisplayName",
    id: "1234",
    joinedAt: new Date().toLocaleDateString(),
    roles: [],
    discriminator: "1234",
    username: "Username",
    presence: "online",
    boostingSince: new Date().toLocaleDateString(),
};

const props = {
    user,
};

describe("UserStatus", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(<UserStatus {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it("should render displayName", () => {
        const { baseElement } = renderWithTheme(<UserStatus {...props} />);
        expect(baseElement).toContainHTML("DisplayName");
    });
    it("should render username", () => {
        const { baseElement } = renderWithTheme(<UserStatus {...props} />);
        expect(baseElement).toContainHTML("Username");
    });
    it("should render id", () => {
        const { baseElement } = renderWithTheme(<UserStatus {...props} />);
        expect(baseElement).toContainHTML("1234");
    });
});
