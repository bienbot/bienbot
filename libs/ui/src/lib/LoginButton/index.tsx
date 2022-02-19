import styled from "styled-components";

export interface LoginButtonProps {
    text: string;
    authEndpoint: string;
}

export function LoginButton(props: LoginButtonProps) {
    const login = () => {
        if (window) {
            window.location.href = props.authEndpoint;
        }
    };

    return (
        <StyledLoginButton onClick={login}>
            <StyledText>{props.text}</StyledText>
        </StyledLoginButton>
    );
}

const StyledLoginButton = styled.button`
    width: 273px;
    height: 60px;
    background: #2c2c81;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 4px 8px 0px #2c2c8140;
    transition: all 0.15s ease-in-out;
    cursor: pointer;

    :hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 8px 0px #2c2c8180;
    }
`;

const StyledText = styled.span`
    font-size: 24px;
    font-weight: 700;
    font-family: Outfit;
    color: #fff;
`;

export default LoginButton;
