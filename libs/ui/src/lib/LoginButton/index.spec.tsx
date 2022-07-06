import "@testing-library/jest-dom";
import { renderWithTheme } from "../../utils/renderWithTheme";
import LoginButton from "./index";

describe("LoginButton", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <LoginButton
                authEndpoint=""
                text="Log in with Discord"
                handleLogin={async () => {
                    return;
                }}
            />
        );
        expect(baseElement).toBeTruthy();
    });
});
