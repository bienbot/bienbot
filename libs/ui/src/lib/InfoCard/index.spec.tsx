import "@testing-library/jest-dom";

import { renderWithTheme } from "../../utils/renderWithTheme";

import InfoCard from "./index";

describe("InfoCard", () => {
	it("should render successfully", () => {
		const { baseElement } = renderWithTheme(
			<InfoCard label="label" text="text" />
		);
		expect(baseElement).toBeTruthy();
	});
	it("should display label", () => {
		const { baseElement } = renderWithTheme(
			<InfoCard label="label" text="text" />
		);
		expect(baseElement).toContainHTML("label");
	});
	it("should display text", () => {
		const { baseElement } = renderWithTheme(<InfoCard text="text" />);
		expect(baseElement).toContainHTML("text");
	});
});
