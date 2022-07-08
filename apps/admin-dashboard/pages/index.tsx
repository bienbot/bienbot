import * as React from "react";

import { supabase } from "../services/supabase";

export function Index() {
	return <div></div>;
}

export const getServerSideProps = async ({ req }) => {
	const { user } = await supabase.auth.api.getUserByCookie(req);

	if (!user) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
			props: {},
		};
	}

	return {
		redirect: {
			permanent: false,
			destination: "/servers",
		},
		props: {},
	};
};

export default Index;
