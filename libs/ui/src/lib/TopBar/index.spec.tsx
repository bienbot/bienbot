import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import TopBar from "./index";

describe("TopBar", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<TopBar serverName="Test Server" />);
        expect(baseElement).toBeTruthy();
    });
    it("should display short server name", () => {
        const { baseElement } = render(
            <TopBar serverName="TestTestTestTest" />
        );
        expect(baseElement).toContainHTML("TestTestTestTest");
    });
    it("should cut off long server name", () => {
        const { baseElement } = render(
            <TopBar serverName="TestTestTestTestTest" />
        );
        expect(baseElement).toContainHTML("TestTestTestTe...");
    });
});
