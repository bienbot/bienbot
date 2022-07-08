import { GoMail } from "react-icons/go";

import { renderWithTheme } from "../../utils/renderWithTheme";
import { SidebarButtonProps } from "../SidebarButton";

import Sidebar from "./index";

const button = {
	text: "Text",
	icon: <GoMail />,
	href: "",
	isActive: false,
};

const buttons: SidebarButtonProps[] = new Array(4).fill(0).map((_, i) => {
	return {
		...button,
		href: `${i + 1}`,
	};
});

const props = {
	buttons,
};

describe("Sidebar", () => {
	it("should render successfully", () => {
		const { baseElement } = renderWithTheme(
			<Sidebar href="" logoText="Bien" {...props} />
		);
		expect(baseElement).toBeTruthy();
	});
});
