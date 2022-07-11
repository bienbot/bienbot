import React from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import styled from "styled-components";
import { useWindowSize } from "usehooks-ts";

import SearchBar from "../SearchBar";

export interface TopBarProps {
	serverName: string;
	serverId: string;
}

export function TopBar(props: TopBarProps) {
	const [searchValue, setSearchValue] = React.useState("");
	const { width } = useWindowSize();
	const name =
		props.serverName.length > 16
			? [...props.serverName.split("")]
					.filter((_, i) => i < 14)
					.join("") + "..."
			: props.serverName;
	return (
		<StyledTopBar>
			<Link href={`/guilds/${props.serverId}`} passHref>
				<StyledTopBarHeader>
					{(width >= 768 ? name : props.serverName) || (
						<Skeleton inline height={30} />
					)}
				</StyledTopBarHeader>
			</Link>
			<SearchBar
				value={searchValue}
				onChange={setSearchValue}
				callback={() => console.log("Clicked button")}
			/>
		</StyledTopBar>
	);
}

const StyledTopBar = styled.div`
	position: fixed;
	width: calc(100vw - 80px);
	z-index: 1;
	margin: 0;
	padding: 11px;
	padding-left: 32px;
	height: 80px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.primary[200]};
	background-color: ${({ theme }) => theme.colors.background};
	display: flex;
	align-items: center;
	justify-content: space-between;
	line-height: 1;
`;

const StyledTopBarHeader = styled.a`
	max-width: 250px;
	width: 100%;
	font-size: ${({ theme }) => theme.font.size.xlarge};
	margin: auto 0;
	color: ${({ theme }) => theme.colors.primary[700]};
	font-weight: bold;
	font-family: ${({ theme }) => theme.font.family};
	text-decoration: none;
`;

export default TopBar;
