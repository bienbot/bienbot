import "@testing-library/jest-dom";
import { renderWithTheme } from "../../utils/renderWithTheme";
import SearchResult from "./index";

describe("SearchResult", () => {
    it("Should render successfully", () => {
        const { baseElement } = renderWithTheme(<SearchResult />);
        expect(baseElement).toBeTruthy();
    });
});
