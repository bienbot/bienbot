import { renderWithTheme } from "../../utils/renderWithTheme";
import EventCard from "../EventCard";
import MessageCard, { MessageCardProps } from "../MessageCard";
import CardsPanel from "./index";

const exampleMessage = {
    user: {
        displayName: "user",
        discordTag: "userTag#123",
        id: "",
    },
    messageContent: `Lorem, ipsum dolor.`,
    channel: { id: "", name: "general" },
    time: "23:36",
    messageId: "1",
};

const exampleEvent = {
    imageSrc:
        "https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
    displayName: "user",
    discordTag: "userTag#123",
    eventDescription: "joined the",
    eventTarget: "server",
    eventTime: "23:36",
};

const messages = new Array(1).fill(exampleMessage);
const events = new Array(1).fill(exampleEvent);

describe("CardsPanel", () => {
    it("should render successfully", () => {
        const { baseElement } = renderWithTheme(
            <CardsPanel href="/" heading="Test">
                <></>
            </CardsPanel>
        );
        expect(baseElement).toBeTruthy();
    });
    it("should render heading", () => {
        const { baseElement } = renderWithTheme(
            <CardsPanel href="/" heading="TestHeading">
                <></>
            </CardsPanel>
        );
        expect(baseElement).toContainHTML("TestHeading");
    });
    it("should render MessageCard", () => {
        const { baseElement } = renderWithTheme(
            <CardsPanel href="/" heading="Test">
                {messages.map((message: MessageCardProps) => (
                    <MessageCard key={message.messageId} {...message} />
                ))}
            </CardsPanel>
        );
        expect(baseElement).toContainHTML("user");
        expect(baseElement).toContainHTML("userTag#123");
        expect(baseElement).toContainHTML("general");
        expect(baseElement).toContainHTML("23:36");
        expect(baseElement).toContainHTML("Lorem, ipsum dolor.");
    });
    it("should render EventCard", () => {
        const { baseElement } = renderWithTheme(
            <CardsPanel href="/" heading="Test">
                {events.map((event) => (
                    <EventCard
                        key={
                            event.discordTag +
                            event.displayName +
                            event.eventTarget
                        }
                        {...event}
                    />
                ))}
            </CardsPanel>
        );
        expect(baseElement).toContainHTML("user");
        expect(baseElement).toContainHTML("userTag#123");
        expect(baseElement).toContainHTML("server");
        expect(baseElement).toContainHTML("23:36");
        expect(baseElement).toContainHTML("joined the");
    });
});
