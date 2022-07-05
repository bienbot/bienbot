import { mockGuildData } from "../../utils/mockGuildData";
import { renderWithTheme } from "../../utils/renderWithTheme";

import MessageCard from "./index";

const props = {
    message: mockGuildData.messages[0],
    author: mockGuildData.members[0],
    channel: mockGuildData.channels[0],
};

describe("MessageCard", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(<MessageCard {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it("should render time", () => {
        const { baseElement } = renderWithTheme(<MessageCard {...props} />);
        expect(baseElement).toContainHTML("00:00");
    });
    it("should render message content", () => {
        const { baseElement } = renderWithTheme(<MessageCard {...props} />);
        expect(baseElement).toContainHTML("Message 0");
    });
    it("should render channel name", () => {
        const { baseElement } = renderWithTheme(<MessageCard {...props} />);
        expect(baseElement).toContainHTML("channelName");
    });
    it("should render user display name", () => {
        const { baseElement } = renderWithTheme(<MessageCard {...props} />);
        expect(baseElement).toContainHTML("testUserDisplayName");
    });
    it("should render user discord tag", () => {
        const { baseElement } = renderWithTheme(<MessageCard {...props} />);
        expect(baseElement).toContainHTML("testUserName#7777");
    });
});
