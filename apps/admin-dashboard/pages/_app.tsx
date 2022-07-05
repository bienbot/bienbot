import { dashboardTheme } from "@bienbot/themes";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { Provider } from "react-redux";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { guildStore } from "../features/guild/guildStore";
import { supabase } from "../services/supabase";
import NextNProgress from "nextjs-progressbar";

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
    const router = useRouter();

    React.useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                handleAuthChange(event, session);
                if (event === "SIGNED_IN") {
                    if (router.pathname === "/login") {
                        router.push("/servers/");
                    }
                }
                if (event === "SIGNED_OUT") {
                    router.push("/");
                }
            }
        );
        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return (
        <>
            <Provider store={guildStore}>
                <GlobalStyles />
                <Head>
                    <title>Bienbot</title>
                </Head>
                <ThemeProvider theme={dashboardTheme}>
                    <NextNProgress
                        color={dashboardTheme.colors.primary["500"]}
                    />
                    <main className="app">
                        {getLayout(<Component {...pageProps} />)}
                    </main>
                </ThemeProvider>
            </Provider>
        </>
    );
}

async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
    });
}

export default CustomApp;
