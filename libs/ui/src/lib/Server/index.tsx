import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export interface ServerProps {
    imageSrc: string;
    serverName: string;
    href: string;
}

export function Server(props: ServerProps) {
    return (
        <Link href={props.href} passHref>
            <StyledServer>
                <StyledImageContainer>
                    <Image
                        src={props.imageSrc}
                        alt={props.serverName}
                        unoptimized
                        priority
                        width="44px"
                        height="44px"
                        layout="fixed"
                    />
                </StyledImageContainer>
                <StyledServerContainer>
                    <StyledServerName>{props.serverName}</StyledServerName>
                </StyledServerContainer>
            </StyledServer>
        </Link>
    );
}

const StyledServer = styled.a`
    display: flex;
    align-items: center;
    justify-content: start;
    max-width: 600px;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.primary[100]};
    border-radius: 8px;
    text-decoration: none;
`;

const StyledImageContainer = styled.div`
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    transition: border-radius 0.2s ease-in-out;

    ${StyledServer}:hover & {
        border-radius: 8px;
    }
`;

const StyledServerContainer = styled.div`
    width: fit-content;
    margin-left: 16px;
`;

const StyledServerName = styled.span`
    color: ${({ theme }) => theme.colors.primary[700]};
    font-size: ${({ theme }) => theme.font.size.large};
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export default Server;
