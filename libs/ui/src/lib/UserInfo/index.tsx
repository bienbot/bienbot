import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import styled from "styled-components";

type Direction = "row" | "column";

export interface UserInfoProps {
	imageSrc: string;
	discordTag: string;
	displayName: string;
	direction: Direction;
	username?: string;
}

export function UserInfo(props: UserInfoProps) {
	return (
		<StyledUserInfo>
			<StyledImageContainer>
				{props.imageSrc ? (
					<Image
						src={props.imageSrc}
						width="32px"
						height="32px"
						layout="fixed"
						alt={props.discordTag}
					/>
				) : (
					<Skeleton width="32px" height="32px" circle />
				)}
			</StyledImageContainer>
			<StyledUserInfoContainer direction={props.direction}>
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
			</StyledUserInfoContainer>
		</StyledUserInfo>
	);
}

const StyledUserInfo = styled.div`
	display: flex;
	align-items: center;
	min-width: 194px;
	max-height: 32px;
`;

const StyledImageContainer = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	flex-shrink: 0;
	overflow: hidden;
`;

const StyledUserInfoContainer = styled.div<{
	direction: Direction;
}>`
	display: flex;
	flex-wrap: wrap;
	flex-direction: ${(props) =>
		props.direction === "row" ? "row-reverse" : "column"};
	justify-content: start;
	gap: ${(props) => (props.direction === "row" ? "4px" : "0")};
	max-width: 100%;
	width: 100%;
	margin-left: 8px;
	font-size: ${({ theme }) => theme.font.small};
	font-family: ${({ theme }) => theme.font.family};
	min-width: 0;
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

export default UserInfo;
