import { renderWithTheme } from "../../utils/renderWithTheme";

import MessageCard from "./index";

const messageInfo = {
    author: {
        avatar: "https://www.github.com/lkarasinski.png",
        displayName: "Display Name",
        discriminator: "1234",
        id: "12345678",
        username: "Username",
    },
    content: {
        text: `Test message`,
        attachments: [],
    },
    id: "1",
    timestamp: { seconds: 0, nanoseconds: 0 },
    channel: { id: "", name: "general" },
};

describe("MessageCard", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <MessageCard {...messageInfo} />
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render time", () => {
        const { baseElement } = renderWithTheme(
            <MessageCard {...messageInfo} />
        );
        expect(baseElement).toContainHTML("01:00");
    });
    it("should render message content", () => {
        const { baseElement } = renderWithTheme(
            <MessageCard {...messageInfo} />
        );
        expect(baseElement).toContainHTML("Test message");
    });
    it("should render channel name", () => {
        const { baseElement } = renderWithTheme(
            <MessageCard {...messageInfo} />
        );
        expect(baseElement).toContainHTML("general");
    });
    it("should render user display name", () => {
        const { baseElement } = renderWithTheme(
            <MessageCard {...messageInfo} />
        );
        expect(baseElement).toContainHTML("Display Name");
    });
    it("should render user discord tag", () => {
        const { baseElement } = renderWithTheme(
            <MessageCard {...messageInfo} />
        );
        expect(baseElement).toContainHTML("Username#1234");
    });
});
