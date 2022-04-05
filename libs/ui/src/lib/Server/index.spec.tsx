import "@testing-library/jest-dom";
import { renderWithTheme } from "../../utils/renderWithTheme";
import Server from "./index";

describe("Server", () => {
    it("Should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <Server
                imageSrc="https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp"
                serverName="Test Server"
                href=""
            />
        );
        expect(baseElement).toBeTruthy();
    });
    it("Should display server name", () => {
        const { baseElement } = renderWithTheme(
            <Server
                imageSrc="https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp"
                serverName="Test Server"
                href=""
            />
        );
        expect(baseElement).toContainHTML("Test Server");
    });
});
