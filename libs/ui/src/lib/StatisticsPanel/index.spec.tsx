import { render } from "@testing-library/react";
import { renderWithTheme } from "../../utils/renderWithTheme";

import StatisticsPanel from "./index";

describe("StatisticsPanel", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <StatisticsPanel
                heading="Server Statistics"
                statistics={[{ label: "Online users", text: "60" }]}
                href="/statistics"
            />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render given statistics", () => {
        const { baseElement } = renderWithTheme(
            <StatisticsPanel
                heading="Server Statistics"
                statistics={[{ label: "Online users", text: "60" }]}
                href="/statistics"
            />
        );
        expect(baseElement).toContainHTML("Online users");
        expect(baseElement).toContainHTML("60");
    });
    it("should render given heading", () => {
        const { baseElement } = renderWithTheme(
            <StatisticsPanel
                heading="Server Statistics"
                statistics={[{ label: "Online users", text: "60" }]}
                href="/statistics"
            />
        );
        expect(baseElement).toContainHTML("Server Statistics");
    });
});
