import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import LoginButton from "./index";

describe("LoginButton", () => {
    it("should render successfully", () => {
        const { baseElement } = render(
            <LoginButton authEndpoint="" text="Log in with Discord" />
        );
        expect(baseElement).toBeTruthy();
    });
});
