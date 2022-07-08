import { MemberData } from "@bienbot/types";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export interface UserCardProps {
	imageSrc: string;
	discordTag: string;
	displayName: string;
	direction: "row" | "column";
	username?: string;
	href: string;
	presence: MemberData["presence"];
}

export function UserCard(props: UserCardProps) {
	return (
		<Link href={props.href} passHref>
			<StyledUserCard>
				<StyledImageContainer>
					<StyledImage
						src={props.imageSrc}
						width="32px"
						height="32px"
						layout="fixed"
						alt={props.discordTag}
					/>
					{[
						"online",
						"idle",
						"dnd",
						"offline",
						"invisible",
						null,
					].includes(props.presence) && (
						<PresenceStatusDot presence={props.presence} />
					)}
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
	position: relative;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	flex-shrink: 0;
`;

const StyledImage = styled(Image)`
	border-radius: 50%;
`;

const StyledUserCardContainer = styled.div<{
	direction: "row" | "column";
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

const PresenceStatusDot = styled.div<{
	presence: "online" | "idle" | "dnd" | "offline" | "invisible" | null;
}>`
	position: absolute;
	background-color: ${({ presence }) => {
		switch (presence) {
			case "online":
				return "#5aa364";
			case "idle":
				return "#eeac42";
			case "dnd":
				return "#db504c";
			default:
				return "grey";
		}
	}};
	width: 14px;
	height: 14px;
	right: 0;
	bottom: 0;
	border-radius: 50%;
	border: 2px solid #fff;
	transition: color 0.1s ease-in-out;
`;

export default UserCard;
