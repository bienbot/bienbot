import { mockGuildData } from "../../utils/mockGuildData";
import { renderWithTheme } from "../../utils/renderWithTheme";
import EventCard, { EventCardProps } from "../EventCard";
import MessageCard, { MessageCardProps } from "../MessageCard";

import CardsPanel from "./index";

const messageProps: MessageCardProps = {
	message: mockGuildData.messages[0],
	author: mockGuildData.members[0],
	channel: mockGuildData.channels[0],
};

const eventProps: EventCardProps = {
	event: mockGuildData.events[0],
	member: mockGuildData.members[0],
};

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
				<MessageCard {...messageProps} />
			</CardsPanel>
		);

		/* Check if userName is displayed properly*/
		expect(baseElement).toContainHTML("testUserName");
		expect(baseElement).toContainHTML("testUserName#7777");
		expect(baseElement).toContainHTML("channelName");
		expect(baseElement).toContainHTML("00:00");
		expect(baseElement).toContainHTML("Message 0");
	});
	it("should render EventCard", () => {
		const { baseElement } = renderWithTheme(
			<CardsPanel href="/" heading="Test">
				<EventCard {...eventProps} />
			</CardsPanel>
		);
		expect(baseElement).toContainHTML("testUserDisplayName");
		expect(baseElement).toContainHTML("#7777");
		expect(baseElement).toContainHTML("eventDescription");
		expect(baseElement).toContainHTML("01/01 00:00");
		expect(baseElement).toContainHTML("eventTarget");
	});
});
