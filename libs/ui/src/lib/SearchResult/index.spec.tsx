import "@testing-library/jest-dom";

import { renderWithTheme } from "../../utils/renderWithTheme";

import SearchResult from "./index";

const props = {
	icon: <div>Icon</div>,
	children: <div>Children</div>,
	href: "/",
};

describe("SearchResult", () => {
	it("Should render successfully", () => {
		const { baseElement } = renderWithTheme(<SearchResult {...props} />);
		expect(baseElement).toBeTruthy();
	});
});
