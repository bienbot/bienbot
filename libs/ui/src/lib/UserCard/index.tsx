import Skeleton from "react-loading-skeleton";
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
					{props.imageSrc ? (
						<>
							<StyledImage
								src={props.imageSrc}
								width="32px"
								height="32px"
								layout="fixed"
								alt={props.discordTag}
							/>
							<PresenceStatusDot presence={props.presence} />
						</>
					) : (
						<Skeleton width="32px" height="32px" circle />
					)}
				</StyledImageContainer>
				<StyledUserCardContainer direction={props.direction}>
					<StyledDiscordTag>
						{props.username && props.discordTag ? (
							`${props.username}#${props.discordTag}`
						) : (
							<Skeleton />
						)}
					</StyledDiscordTag>
					<StyledUserName>
						{props.displayName || <Skeleton />}
					</StyledUserName>
					{props.direction === "row" &&
					!props.username &&
					!props.discordTag &&
					!props.displayName ? (
						<Skeleton width={300} height={20} />
					) : null}
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
	max-width: 100%;
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
	justify-content: start;
	gap: ${(props) => (props.direction === "row" ? "4px" : "0")};
	min-width: 0;
	width: 100%;
	max-width: 100%;
	margin-left: 8px;
	font-size: ${({ theme }) => theme.font.small};
	font-family: ${({ theme }) => theme.font.family};
`;

const StyledUserName = styled.span`
	font-weight: 700;
	color: ${({ theme }) => theme.colors.primary[400]};
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
