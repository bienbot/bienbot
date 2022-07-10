import * as React from "react";
import { Provider } from "react-redux";
import { dashboardTheme, dashboardThemeDark } from "@bienbot/themes";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useDarkMode } from "usehooks-ts";

import { guildStore } from "../features/guild/guildStore";
import { supabase } from "../services/supabase";

const GlobalStyles = createGlobalStyle<{ backgroundColor: string }>`
html{
	background-color: ${(props) => props.backgroundColor};
}

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

	const { isDarkMode } = useDarkMode();

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Provider store={guildStore}>
				<GlobalStyles
					backgroundColor={
						isDarkMode
							? dashboardThemeDark.colors.background
							: dashboardTheme.colors.background
					}
				/>
				<Head>
					<title>Bienbot</title>
				</Head>
				<ThemeProvider
					theme={isDarkMode ? dashboardThemeDark : dashboardTheme}
				>
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
