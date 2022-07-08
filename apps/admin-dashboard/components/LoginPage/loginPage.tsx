import * as React from "react";
import { LoginButton } from "@bienbot/ui";
import Image from "next/image";
import { useRouter } from "next/router";

import { supabase } from "../../services/supabase";

import {
	StyledExampleWrapper,
	StyledImageWrapper,
	StyledLoginInfo,
	StyledLoginInfoWrapper,
	StyledLoginWrapper,
	StyledName,
	StyledNameWrapper,
	StyledSpan,
	StyledWrapper,
} from "./loginPage.style";

const LoginPage = () => {
	const router = useRouter();
	const handleLogin = async () => {
		const { session } = await supabase.auth.signIn({
			provider: "discord",
		});
		if (session) {
			router.push("/servers");
		}
	};

	return (
		<StyledWrapper>
			<StyledLoginWrapper>
				<StyledNameWrapper>
					<StyledName>BienBot</StyledName>
					<StyledSpan>Discord bot dashboard</StyledSpan>
				</StyledNameWrapper>
				<StyledLoginInfoWrapper>
					<StyledLoginInfo>You are not logged in</StyledLoginInfo>
					<LoginButton
						text="Log in with Discord"
						authEndpoint="http://localhost:3000/api/auth/discord"
						handleLogin={handleLogin}
					/>
				</StyledLoginInfoWrapper>
			</StyledLoginWrapper>
			<StyledExampleWrapper>
				<StyledImageWrapper>
					<Image
						height={1024}
						width={1440}
						src="http://www.data.lkarasinski.pl/bienbot/bienbot_dashboard.png"
						alt="BienBot dashboard example image"
						draggable="false"
						layout="fixed"
					/>
				</StyledImageWrapper>
			</StyledExampleWrapper>
		</StyledWrapper>
	);
};

export { LoginPage };
