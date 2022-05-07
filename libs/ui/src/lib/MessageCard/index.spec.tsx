import { renderWithTheme } from "../../utils/renderWithTheme";

import MessageCard from "./index";

const messageInfo = {
    messageContent: "Test message",
    user: {
        displayName: "UserDisplayName",
        discordTag: "User#1234",
        id: "",
        imageSrc: "",
    },
    messageId: "",
    time: "23:36",
    channel: {
        name: "ChannelName",
        id: "",
    },
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
        expect(baseElement).toContainHTML("23:36");
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
        expect(baseElement).toContainHTML("UserDisplayName");
    });
    it("should render user discord tag", () => {
        const { baseElement } = renderWithTheme(
            <MessageCard {...messageInfo} />
        );
        expect(baseElement).toContainHTML("User#1234");
    });
});
