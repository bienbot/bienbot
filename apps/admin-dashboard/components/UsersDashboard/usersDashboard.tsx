import * as React from "react";
import { GuildData } from "@bienbot/types";
import { UserCard } from "@bienbot/ui";
import useFuse from "use-fuse";

import {
	StyledHeading,
	StyledHeadingWrapper,
	StyledInput,
	StyledSpan,
	StyledUsersInfo,
	StyledUsersWrapper,
	StyledWrapper,
} from "./usersDashboard.style";

type Props = {
	guildData: GuildData;
};

const userPresence = {
	online: ["online", "idle", "dnd"],
	offline: ["offline", "invisible", null],
};

const UsersDashboard = ({ guildData }: Props) => {
	const usersData = Object.values(guildData.members).filter(
		(member) => !member.bot
	);
	const [search, setSearch] = React.useState("");
	const fuseOptions = {
		keys: ["username", "displayName", "id", "discriminator"],
		threshold: 0.35,
	};
	const searchResult = useFuse(usersData, search, fuseOptions);

	const filteredUsers = () => {
		const sortedUsersData = usersData.sort((a, b) => {
			const userNameA = a.displayName.toLowerCase();
			const userNameB = b.displayName.toLowerCase();

			if (
				userPresence.online.includes(a.presence) &&
				userPresence.offline.includes(b.presence)
			) {
				return -1;
			}
			if (
				userPresence.offline.includes(a.presence) &&
				userPresence.online.includes(b.presence)
			) {
				return 1;
			}

			if (userNameA < userNameB) {
				return -1;
			}
			if (userNameA > userNameB) {
				return 1;
			}
			return 0;
		});

		if (searchResult.length > 0) {
			return searchResult.map((user) => (
				<UserCard
					direction="column"
					discordTag={user.discriminator}
					displayName={user.displayName}
					username={user.username}
					imageSrc={
						user.avatar ??
						"data:image/png;base64,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"
					}
					href={`/guilds/${guildData.id}/users/${user.id}`}
					key={user.id}
					presence={user.presence}
				/>
			));
		}

		if (!search) {
			return sortedUsersData.map((user) => (
				<UserCard
					direction="column"
					discordTag={user.discriminator}
					displayName={user.displayName}
					username={user.username}
					imageSrc={
						user.avatar ??
						"data:image/png;base64,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"
					}
					href={`/guilds/${guildData.id}/users/${user.id}`}
					key={user.id}
					presence={user.presence}
				/>
			));
		}
		return [];
	};

	const onlineUsers = usersData.filter((member) =>
		userPresence.online.includes(member.presence)
	);
	const offlineUsers = usersData.filter((member) =>
		userPresence.offline.includes(member.presence)
	);

	return (
		<StyledWrapper>
			<StyledUsersInfo>
				<StyledHeadingWrapper>
					<StyledHeading>
						Online users:{" "}
						<StyledSpan>{onlineUsers.length}</StyledSpan>
					</StyledHeading>
					<StyledHeading>
						Offline users:{" "}
						<StyledSpan>{offlineUsers.length}</StyledSpan>
					</StyledHeading>
				</StyledHeadingWrapper>
				<StyledInput
					type="search"
					id="searchUsers"
					name="searchUsers"
					placeholder="Search users..."
					aria-label="Search through users"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</StyledUsersInfo>
			<StyledUsersWrapper>
				{filteredUsers().length ? (
					filteredUsers()
				) : (
					<StyledHeading as="h2">No results found</StyledHeading>
				)}
			</StyledUsersWrapper>
		</StyledWrapper>
	);
};

export { UsersDashboard };
