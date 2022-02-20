import { renderWithTheme } from "../../utils/renderWithTheme";

import EventCard, { EventCardProps } from "./index";

const event: EventCardProps = {
    displayName: "member",
    discordTag: "#1234",
    eventDescription: "joined voice channel",
    eventTarget: "general",
    eventTime: "23:36",
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
};

describe("EventCard", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(<EventCard {...event} />);
        expect(baseElement).toBeTruthy();
    });
    it("should render displayName", () => {
        const { baseElement } = renderWithTheme(<EventCard {...event} />);
        expect(baseElement).toContainHTML("member");
    });
    it("should render discordTag", () => {
        const { baseElement } = renderWithTheme(<EventCard {...event} />);
        expect(baseElement).toContainHTML("#1234");
    });
    it("should render eventDescription", () => {
        const { baseElement } = renderWithTheme(<EventCard {...event} />);
        expect(baseElement).toContainHTML("joined voice channel");
    });
    it("should render eventTarget", () => {
        const { baseElement } = renderWithTheme(<EventCard {...event} />);
        expect(baseElement).toContainHTML("general");
    });
    it("should render eventTime", () => {
        const { baseElement } = renderWithTheme(<EventCard {...event} />);
        expect(baseElement).toContainHTML("23:36");
    });
    it("should render eventTargetHref when given ", () => {
        const { baseElement } = renderWithTheme(
            <EventCard {...event} eventTargetHref={"eventHref"} />
        );
        expect(baseElement).toContainHTML("eventHref");
    });
});
