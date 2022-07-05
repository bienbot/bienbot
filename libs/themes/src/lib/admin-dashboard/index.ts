// Do not edit; to change theme edit theme.ts

import { DefaultTheme } from "styled-components";
import { theme, darkTheme } from "./theme";

interface ITheme extends DefaultTheme {
    font: {
        family: string;
        weight: {
            regular: number;
            medium: number;
            semiBold: number;
            bold: number;
            extraBold: number;
            black: number;
        };
        size: {
            xsmall: string;
            small: string;
            medium: string;
            large: string;
            xlarge: string;
        };
    };
    colors: {
        primary: {
            "100": string;
            "200": string;
            "300": string;
            "400": string;
            "500": string;
            "600": string;
            "700": string;
            "800": string;
            "900": string;
            shadow: {
                light: string;
                strong: string;
            };
        };
        background: string;
    };
}

export const dashboardTheme: ITheme = theme;
export const dashboardThemeDark: ITheme = darkTheme;
