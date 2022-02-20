import { renderWithTheme } from "../../utils/renderWithTheme";
import MessagesPanel from "./index";

const exampleMessage = {
    user: {
        displayName: "user",
        discordTag: "userTag#123",
        id: "",
    },
    messageContent: `Lorem, ipsum dolor.`,
    channel: { id: "", name: "general" },
    time: "23:36",
};

describe("MessagesPanel", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <MessagesPanel
                messages={[exampleMessage]}
                href="/"
                heading="Test"
            />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render heading", () => {
        const { baseElement } = renderWithTheme(
            <MessagesPanel
                messages={[exampleMessage]}
                href="/"
                heading="Heading"
            />
        );
        expect(baseElement).toContainHTML("Heading");
    });
    it("should render message", () => {
        const { baseElement } = renderWithTheme(
            <MessagesPanel
                messages={[exampleMessage]}
                href="/"
                heading="Test"
            />
        );
        expect(baseElement).toContainHTML("user");
        expect(baseElement).toContainHTML("userTag#123");
        expect(baseElement).toContainHTML("general");
        expect(baseElement).toContainHTML("23:36");
        expect(baseElement).toContainHTML("Lorem, ipsum dolor.");
    });
});
