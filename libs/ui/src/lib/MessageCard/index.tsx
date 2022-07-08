import { ChannelData, MemberData, MessageData } from "@bienbot/types";
import { format } from "date-fns";
import Image from "next/image";
import styled from "styled-components";

import OptionalLinkWrapper from "../OptionalLinkWrapper";

export type MessageCardProps = {
	message: MessageData;
	author: MemberData;
	channel: ChannelData;
};

export function MessageCard(props: MessageCardProps) {
	const { message, author, channel } = props;

	const parsedAttachments = message.attachments
		? message.attachments?.map((attachment) => JSON.parse(attachment))
		: [];

	return (
		<StyledMessageCard>
			<StyledImage src={author.avatar}></StyledImage>
			<StyledInfoContainer>
				<OptionalLinkWrapper
					href={`${message.guild}/users/${author.id}`}
				>
					<StyledUserInfo as={"a"}>
						<StyledHighlight>
							{props.author.displayName}
						</StyledHighlight>
						<StyledDiscordTag>
							{props.author.username}#{props.author.discriminator}
						</StyledDiscordTag>
					</StyledUserInfo>
				</OptionalLinkWrapper>
				<StyledMessageInfo>
					<span>in</span>
					<OptionalLinkWrapper
						href={`${message.guild}/channels/${channel.id}`}
					>
						<StyledChannelName as={"a"}>
							#{channel.name}
						</StyledChannelName>
					</OptionalLinkWrapper>
					<span>at</span>
					<StyledHighlight>
						{format(new Date(message.timestamp), "dd/MM HH:mm")}
					</StyledHighlight>
				</StyledMessageInfo>
			</StyledInfoContainer>
			<StyledMessage>{message.content}</StyledMessage>
			{parsedAttachments?.length >= 1 &&
				parsedAttachments?.map((attachment) => {
					const aspectRatio =
						(attachment.width ?? 1) / (attachment.height ?? 1);
					if (attachment.contentType.startsWith("image")) {
						return (
							<ImageContainer
								orientation={
									aspectRatio > 1 ? "horizontal" : "vertical"
								}
							>
								<Image
									layout="responsive"
									width={aspectRatio * 200}
									height={200}
									src={attachment.url}
									key={attachment.url}
								></Image>
							</ImageContainer>
						);
					}

					if (attachment.contentType.startsWith("video")) {
						return (
							<VideoContainer
								orientation={
									aspectRatio > 1 ? "horizontal" : "vertical"
								}
							>
								<video controls>
									<source
										src={attachment.url}
										type={attachment.contentType}
									/>
								</video>
							</VideoContainer>
						);
					} else {
						return null;
					}
				})}
		</StyledMessageCard>
	);
}

const ImageContainer = styled.div<{ orientation: "vertical" | "horizontal" }>`
	grid-column: 2/3;
	${({ orientation }) => {
		if (orientation === "vertical") {
			return `max-width: 150px;`;
		} else {
			return `max-height: fit-content; max-width: 500px;`;
		}
	}}
	margin-left: 8px;
	margin-top: 8px;
	position: relative;

	img {
		border-radius: 4px;
	}
`;

const VideoContainer = styled.div<{ orientation: "vertical" | "horizontal" }>`
	grid-column: 2/3;
	margin-left: 8px;
	margin-top: 8px;
	position: relative;

	video {
		border-radius: 4px;
		${({ orientation }) => {
			if (orientation === "vertical") {
				return `width: 200px;`;
			} else {
				return `width: 500px;`;
			}
		}}
	}
`;

const StyledHighlight = styled.span`
	color: ${({ theme }) => theme.colors.primary[400]};
	font-weight: 700;
`;
const StyledDiscordTag = styled.span`
	color: ${({ theme }) => theme.colors.primary[300]};
`;

const StyledChannelName = styled.a`
	color: ${({ theme }) => theme.colors.primary[400]};
	font-weight: 700;
	text-decoration: none;
`;

const StyledInfoContainer = styled.div`
	color: ${({ theme }) => theme.colors.primary[500]};
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-left: 8px;
`;

const StyledUserInfo = styled.a`
	display: block;
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	align-items: center;
	text-decoration: none;
`;

const StyledMessageInfo = styled.div`
	display: flex;
	gap: 4px;
	align-items: center;
	word-break: break-word;
`;

const StyledMessage = styled.div`
	color: ${({ theme }) => theme.colors.primary[500]};
	margin-left: 8px;
	margin-top: 4px;
	overflow-wrap: anywhere;
`;

const StyledImage = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	grid-row: 1/-1;
	grid-column: 1/2;
`;

const StyledMessageCard = styled.div`
	font-size: ${({ theme }) => theme.font.small};
	font-family: ${({ theme }) => theme.font.family};
	background-color: ${({ theme }) => theme.colors.primary[100]};
	padding: 14px;
	border-radius: 8px;
	display: grid;
	grid-template-columns: 32px 1fr;
	grid-template-rows: auto auto;
`;

export default MessageCard;
