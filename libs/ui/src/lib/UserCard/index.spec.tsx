import "@testing-library/jest-dom";

import { mockGuildData } from "../../utils/mockGuildData";
import { renderWithTheme } from "../../utils/renderWithTheme";

import UserCard from "./index";

const guildUser = mockGuildData.members[0];
const props = {
	imageSrc: guildUser.avatar,
	displayName: guildUser.displayName,
	discordTag: guildUser.discriminator,
	direction: "row" as const,
	href: "",
	presence: guildUser.presence,
};
describe("UserCard", () => {
	it("should render successfully", () => {
		const { baseElement } = renderWithTheme(<UserCard {...props} />);
		expect(baseElement).toBeTruthy();
	});
	it("should render user name", () => {
		const { baseElement } = renderWithTheme(<UserCard {...props} />);
		expect(baseElement).toContainHTML("testUserDisplayName");
	});
	it("should render discord discriminator", () => {
		const { baseElement } = renderWithTheme(<UserCard {...props} />);
		expect(baseElement).toContainHTML("#7777");
	});
});
