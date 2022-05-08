import {
    StyledWrapper,
    StyledExampleWrapper,
    StyledLoginWrapper,
    StyledNameWrapper,
    StyledLoginInfoWrapper,
    StyledImageWrapper,
    StyledName,
    StyledSpan,
    StyledLoginInfo,
} from "./loginPage.style";
import { LoginButton } from "@bienbot/ui";
import Image from "next/image";

const LoginPage = () => {
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
