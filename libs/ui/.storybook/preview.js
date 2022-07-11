import { dashboardTheme } from "@bienbot/themes";
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";

import "react-loading-skeleton/dist/skeleton.css";

const themes = [dashboardTheme];

addDecorator(withThemesProvider(themes), ThemeProvider);
