import "@testing-library/jest-dom";
import { renderWithTheme } from "../../utils/renderWithTheme";

import UserInfo from "./index";

describe("UserInfo", () => {
    const link =
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp";
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <UserInfo direction="row" src={link} userName="" discordId="" />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render user name", () => {
        const { baseElement } = renderWithTheme(
            <UserInfo direction="row" src={link} userName="Test" discordId="" />
        );
        expect(baseElement).toContainHTML("Test");
    });
    it("should render discord id", () => {
        const { baseElement } = renderWithTheme(
            <UserInfo
                direction="row"
                src={link}
                userName=""
                discordId="Test#2137"
            />
        );
        expect(baseElement).toContainHTML("Test#2137");
    });
    it("uses correct src", () => {
        const { getByAltText } = renderWithTheme(
            <UserInfo direction="row" src={link} userName="" discordId="123" />
        );

        const image = getByAltText("123") as HTMLImageElement;
        expect(image.src).toContain(link);
    });
});
