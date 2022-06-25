import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

type Direction = "row" | "column";

export interface UserCardProps {
    imageSrc: string;
    discordTag: string;
    displayName: string;
    direction: Direction;
    username?: string;
    href: string;
}

export function UserCard(props: UserCardProps) {
    return (
        <Link href={props.href} passHref>
            <StyledUserCard>
                <StyledImageContainer>
                    <Image
                        src={props.imageSrc}
                        unoptimized
                        width="32px"
                        height="32px"
                        layout="fixed"
                        alt={props.discordTag}
                        priority
                    />
                </StyledImageContainer>
                <StyledUserCardContainer direction={props.direction}>
                    <StyledDiscordTag>
                        {props.username}#{props.discordTag}
                    </StyledDiscordTag>
                    <StyledUserName>{props.displayName}</StyledUserName>
                </StyledUserCardContainer>
            </StyledUserCard>
        </Link>
    );
}

const StyledUserCard = styled.a`
    display: flex;
    align-items: center;
    min-height: 48px;
    max-height: 48px;
    padding: 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary[100]};
    text-decoration: none;
`;

const StyledImageContainer = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
`;

const StyledUserCardContainer = styled.div<{
    direction: Direction;
}>`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) =>
        props.direction === "row" ? "row-reverse" : "column"};
    width: fit-content;
    margin-left: 8px;
    font-size: ${({ theme }) => theme.font.small};
    font-family: ${({ theme }) => theme.font.family};
    min-width: 0;
`;

const StyledUserName = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary[400]};
    margin-right: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledDiscordTag = styled.span`
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary[300]};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default UserCard;
