import { renderWithTheme } from "../../utils/renderWithTheme";
import { ServerProps } from "../Server";

import ServerList from "./index";

const server = {
	imageSrc:
		"https://cdn.discordapp.com/avatars/380454126364131332/1476ffee61d845bbe5a1027da9cb8db3.webp",
	serverName: "Test Server",
	href: "",
};

const servers: ServerProps[] = new Array(4).fill(0).map((_, i) => {
	return {
		...server,
		href: `${i + 1}`,
	};
});

const props = {
	servers,
};

describe("ServerList", () => {
	it("should render successfully", () => {
		const { baseElement } = renderWithTheme(<ServerList {...props} />);
		expect(baseElement).toBeTruthy();
	});
});
