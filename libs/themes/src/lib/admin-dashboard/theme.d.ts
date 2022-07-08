// Do not edit; to change theme edit theme.ts

import "styled-components";

import { darkTheme,theme } from "./theme";

type Theme = typeof theme;
type DarkTheme = typeof darkTheme;

declare module "styled-components" {
	export type Theme = typeof theme;
	export type DarkTheme = typeof darkTheme;
}
