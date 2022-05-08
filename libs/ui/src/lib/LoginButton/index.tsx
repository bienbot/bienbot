import styled from "styled-components";

export interface LoginButtonProps {
    text: string;
    authEndpoint: string;
}

export function LoginButton(props: LoginButtonProps) {
    const handleLogIn = async () => {
        const response = await fetch("http://localhost:3000/api/auth/status", {
            credentials: "include",
        });
        const data = await response.json();
        if (data.msg == "Unauthorized") {
            window.location.href = props.authEndpoint;
        }
    };

    return (
        <StyledLoginButton onClick={handleLogIn}>
            <StyledText>{props.text}</StyledText>
        </StyledLoginButton>
    );
}

const StyledLoginButton = styled.button`
    height: 60px;
    padding: 0 32px;
    background: ${({ theme }) => theme.colors.primary[600]};
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px
        ${({ theme }) => theme.colors.primary.shadow.light};

    transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;

    :hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 8px 0px
            ${({ theme }) => theme.colors.primary.shadow.strong};
    }
`;

const StyledText = styled.span`
    font-size: ${({ theme }) => theme.font.size.xlarge};
    font-weight: 700;
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.colors.background};
`;

export default LoginButton;
