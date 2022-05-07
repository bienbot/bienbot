import { dashboardTheme } from "@bienbot/themes";
import { AppProps } from "next/app";
import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
    /* padding: 0;
    margin: 0; */
}`;

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyles />
            <Head>
                <title>Welcome to admin-dashboard!</title>
            </Head>
            <ThemeProvider theme={dashboardTheme}>
                <main className="app">
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </>
    );
}

export default CustomApp;
