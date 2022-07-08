import { dashboardTheme } from "@bienbot/themes";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import "@testing-library/jest-dom";

export const renderWithTheme = (ui: React.ReactNode) => {
	return render(<ThemeProvider theme={dashboardTheme}>{ui}</ThemeProvider>);
};
