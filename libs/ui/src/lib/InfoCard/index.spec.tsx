import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import InfoCard from "./index";

describe("InfoCard", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<InfoCard label="label" text="text" />);
        expect(baseElement).toBeTruthy();
    });
    it("should display label", () => {
        const { baseElement } = render(<InfoCard label="label" text="text" />);
        expect(baseElement).toContainHTML("label");
    });
    it("should display text", () => {
        const { baseElement } = render(<InfoCard text="text" />);
        expect(baseElement).toContainHTML("text");
    });
});
