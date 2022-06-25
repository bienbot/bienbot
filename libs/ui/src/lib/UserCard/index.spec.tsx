import "@testing-library/jest-dom";
import { renderWithTheme } from "../../utils/renderWithTheme";

import UserCard from "./index";

describe("UserCard", () => {
    const link =
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp";
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <UserCard
                direction="row"
                imageSrc={link}
                displayName=""
                discordTag=""
                href=""
            />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render user name", () => {
        const { baseElement } = renderWithTheme(
            <UserCard
                direction="row"
                imageSrc={link}
                displayName="Test"
                discordTag=""
                href=""
            />
        );
        expect(baseElement).toContainHTML("Test");
    });
    it("should render discord id", () => {
        const { baseElement } = renderWithTheme(
            <UserCard
                direction="row"
                imageSrc={link}
                displayName=""
                discordTag="Test#2137"
                href=""
            />
        );
        expect(baseElement).toContainHTML("Test#2137");
    });
    it("uses correct src", () => {
        const { getByAltText } = renderWithTheme(
            <UserCard
                direction="row"
                imageSrc={link}
                displayName=""
                discordTag="123"
                href=""
            />
        );

        const image = getByAltText("123") as HTMLImageElement;
        expect(image.src).toContain(link);
    });
});
