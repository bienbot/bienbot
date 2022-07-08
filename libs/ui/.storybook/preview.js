import { dashboardTheme } from "@bienbot/themes";
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";

const themes = [dashboardTheme];

addDecorator(withThemesProvider(themes), ThemeProvider);
