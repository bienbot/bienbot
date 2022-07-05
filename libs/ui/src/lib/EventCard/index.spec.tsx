import { mockGuildData } from "../../utils/mockGuildData";
import { renderWithTheme } from "../../utils/renderWithTheme";

import EventCard, { EventCardProps } from "./index";

const props: EventCardProps = {
    event: mockGuildData.events[0],
    member: mockGuildData.members[0],
};

describe("EventCard", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(<EventCard {...props} />);
        expect(baseElement).toBeTruthy();
    });
    it("should render displayName", () => {
        const { baseElement } = renderWithTheme(<EventCard {...props} />);
        expect(baseElement).toContainHTML("testUserDisplayName");
    });
    it("should render discordTag", () => {
        const { baseElement } = renderWithTheme(<EventCard {...props} />);
        expect(baseElement).toContainHTML("#7777");
    });
    it("should render eventDescription", () => {
        const { baseElement } = renderWithTheme(<EventCard {...props} />);
        expect(baseElement).toContainHTML("eventDescription");
    });
    it("should render eventTarget", () => {
        const { baseElement } = renderWithTheme(<EventCard {...props} />);
        expect(baseElement).toContainHTML("eventTarget");
    });
    it("should render event datetime", () => {
        const { baseElement } = renderWithTheme(<EventCard {...props} />);
        expect(baseElement).toContainHTML("01/01 00:00");
    });
});
