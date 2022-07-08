import styled from "styled-components";

import Server, { ServerProps } from "../Server";

export interface ServerListProps {
	servers: ServerProps[];
}

export function ServerList(props: ServerListProps) {
	return (
		<StyledServerList>
			{props.servers.map((server) => (
				<Server key={server.href} {...server} />
			))}
		</StyledServerList>
	);
}

const StyledServerList = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(min(100%/2, max(600px, 100%/3)), 1fr)
	);
	gap: 8px;
	max-width: 100%;
`;

export default ServerList;
