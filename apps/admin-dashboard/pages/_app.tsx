import { dashboardTheme } from "@bienbot/themes";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { Provider } from "react-redux";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { guildDataStore } from "../features/guildData/guildDataStore";

const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}`;

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <Provider store={guildDataStore}>
                <GlobalStyles />
                <Head>
                    <title>Welcome to admin-dashboard!</title>
                </Head>
                <ThemeProvider theme={dashboardTheme}>
                    <main className="app">
                        {getLayout(<Component {...pageProps} />)}
                    </main>
                </ThemeProvider>
            </Provider>
        </>
    );
}

export default CustomApp;
