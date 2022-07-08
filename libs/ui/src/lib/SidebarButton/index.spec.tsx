import { GoMail } from "react-icons/go";

import "@testing-library/jest-dom";

import { renderWithTheme } from "../../utils/renderWithTheme";

import SidebarButton from "./index";

describe("SidebarButton", () => {
	it("should render successfully", () => {
		const { baseElement } = renderWithTheme(
			<SidebarButton isActive text="Text" icon={<GoMail />} href="" />
		);
		expect(baseElement).toBeTruthy();
	});
	it("should render text", () => {
		const { getByText } = renderWithTheme(
			<SidebarButton isActive text="Text" icon={<GoMail />} href="" />
		);
		expect(getByText("Text")).toBeTruthy();
	});
});
