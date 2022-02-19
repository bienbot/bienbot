import { render } from "@testing-library/react";

import StatisticsPanel from "./index";

describe("StatisticsPanel", () => {
    it("should render successfully", () => {
        const { baseElement } = render(
            <StatisticsPanel
                heading="Server Statistics"
                statistics={[{ label: "Online users", text: "60" }]}
                href="/statistics"
            />
        );
        expect(baseElement).toBeTruthy();
    });
});
