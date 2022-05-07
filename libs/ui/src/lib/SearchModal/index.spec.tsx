import "@testing-library/jest-dom";
import { renderWithTheme } from "../../utils/renderWithTheme";
import SearchModal from "./index";

describe("SearchModal", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <SearchModal setSearch={() => {}} search="">
                <></>
            </SearchModal>
        );
        expect(baseElement).toBeTruthy();
    });
});
