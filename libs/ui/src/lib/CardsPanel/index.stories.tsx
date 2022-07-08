import { EventData, MessageData } from "@bienbot/types";
import { Meta, Story } from "@storybook/react";

import { mockGuildData } from "../../utils/mockGuildData";
import EventCard from "../EventCard";
import MessageCard from "../MessageCard";
import UserLeaderboard from "../UserLeaderboard";
import { UserLeaderboardCardProps } from "../UserLeaderboardCard";

import { CardsPanel, CardsPanelProps } from "./index";

export default {
	component: CardsPanel,
	title: "CardsPanel",
} as Meta;

export const Events: Story<CardsPanelProps> = (args) => (
	<CardsPanel {...args} />
);
export const Messages: Story<CardsPanelProps> = (args) => (
	<CardsPanel {...args} />
);
export const Leaderboards: Story<CardsPanelProps> = (args) => (
	<CardsPanel {...args} />
);

const exampleMessage = {
	user: {
		displayName: "mulirus",
		discordTag: "milosz#6729",
		id: "",
	},
	messageContent: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
Voluptatem aperiam ut maxime recusandae voluptates praesentium
reprehenderit earum rem fugit molestias ipsum voluptatibus
facere, animi incidunt dolorum dignissimos quasi aliquid!
Tempora?`,
	messageId: "",
	channel: { id: "", name: "general" },
	time: "23:36",
};

const mockUser = mockGuildData.members[0];
const mockEvent = mockGuildData.events[0];
const mockMessage = mockGuildData.messages[0];
const mockChannel = mockGuildData.channels[0];

const leaderboardUsers: UserLeaderboardCardProps[] = new Array(4)
	.fill(0)
	.map((_, i) => {
		return {
			imageSrc: mockUser.avatar,
			displayName: mockUser.displayName,
			discordTag: mockUser.discriminator,
			username: mockUser.username,
			position: i + 1,
			href: `${i + 1}`,
			count: 8069,
			text: "",
		};
	});

const leaderboardData = [leaderboardUsers, leaderboardUsers];

const messages = new Array(4).fill(mockMessage) as MessageData[];
const events = new Array(4).fill(mockEvent) as EventData[];

Events.args = {
	heading: "Recent events",
	href: "",
	children: events.map((event) => (
		<EventCard key={event.id} member={mockUser} event={event} />
	)),
};

Messages.args = {
	heading: "Recent messages",
	href: "",
	children: messages.map((message) => (
		<MessageCard
			key={message.id}
			message={message}
			author={mockUser}
			channel={mockChannel}
		/>
	)),
};

Leaderboards.args = {
	heading: "Voice channels",
	href: "/",
	children: (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: "32px",
			}}
		>
			<UserLeaderboard
				heading="Voice channels"
				key={leaderboardData[0][0].discordTag}
				users={leaderboardData[0]}
				text="hours"
				guildId=""
			/>
			<UserLeaderboard
				heading="Text channels"
				key={leaderboardData[1][0].discordTag}
				users={leaderboardData[1]}
				text="messages"
				guildId=""
			/>
		</div>
	),
};
