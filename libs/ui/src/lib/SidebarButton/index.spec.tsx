import "@testing-library/jest-dom";
import { renderWithTheme } from "../../utils/renderWithTheme";
import SidebarButton from "./index";
import { GoMail } from "react-icons/go";

describe("SidebarButton", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <SidebarButton text="Text" icon={<GoMail />} href="" />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render text", () => {
        const { getByText } = renderWithTheme(
            <SidebarButton text="Text" icon={<GoMail />} href="" />
        );
        expect(getByText("Text")).toBeTruthy();
    });
});
