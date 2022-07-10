import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

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
					{props.imageSrc ? (
						<Image
							src={props.imageSrc}
							alt={props.serverName}
							width="44px"
							height="44px"
							layout="fixed"
						/>
					) : (
						<Skeleton width="44px" height="44px" circle />
					)}
				</StyledImageContainer>
				<StyledServerName>
					{props.serverName || <Skeleton />}
				</StyledServerName>
			</StyledServer>
		</Link>
	);
}

const StyledServer = styled.a`
	display: flex;
	align-items: center;
	justify-content: start;
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

const StyledServerName = styled.span`
	width: 100%;
	margin: 0 16px;
	color: ${({ theme }) => theme.colors.primary[700]};
	font-size: ${({ theme }) => theme.font.size.large};
	font-family: ${({ theme }) => theme.font.family};
	font-weight: ${({ theme }) => theme.font.weight.medium};
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export default Server;
