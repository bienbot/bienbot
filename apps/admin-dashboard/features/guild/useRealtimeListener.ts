import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ChannelData,
	EventData,
	GuildData,
	MemberData,
	MessageData,
	RoleData,
	VoicePresenceData,
} from "@bienbot/types";

import { supabase } from "../../services/supabase";
import { fetchGuildData } from "../../utils/fetchGuildData";

import {
	addEvent,
	addOrUpdateMember,
	addOrUpdateMessage,
	addOrUpdateRole,
	addVoicePresence,
	selectGuild,
	setInitialData,
	updateChannel,
	updateGuildData,
} from "./guildSlice";

const useRealtimeListener = ({ guildId }: { guildId: string }) => {
	const dispatch = useDispatch();
	const guildData = useSelector(selectGuild);

	React.useEffect(() => {
		const fetchData = async () => {
			const guildData = await fetchGuildData({
				guildId,
			});

			dispatch(setInitialData(guildData));
		};
		if (!guildData.id) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [guildId]);

	React.useEffect(() => {
		const messagesSubscription = supabase
			.from(`messages:guild=eq.${guildId}`)
			.on("*", (payload) => {
				const message: MessageData = payload.new as MessageData;
				dispatch(addOrUpdateMessage(message));
			})
			.subscribe();

		const eventsSubscription = supabase
			.from(`events:guild=eq.${guildId}`)
			.on("*", (payload) => {
				const event: EventData = payload.new as EventData;
				dispatch(addEvent(event));
			})
			.subscribe();

		const channelsUpdateSubscription = supabase
			.from(`channels:guild=eq.${guildId}`)
			.on("*", (payload) => {
				const channel: ChannelData = payload.new as ChannelData;
				dispatch(updateChannel(channel));
			})
			.subscribe();

		const voicePresencesSubscription = supabase
			.from(`voice_presences:guild=eq.${guildId}`)
			.on("*", (payload) => {
				const voicePresence: VoicePresenceData =
					payload.new as VoicePresenceData;
				dispatch(addVoicePresence(voicePresence));
			})
			.subscribe();

		const rolesSubscription = supabase
			.from(`roles:guild=eq.${guildId}`)
			.on("*", (payload) => {
				const role: RoleData = payload.new as RoleData;
				dispatch(addOrUpdateRole(role));
			})
			.subscribe();

		const guildSubscription = supabase
			.from(`guilds:id=eq.${guildId}`)
			.on("*", (payload) => {
				const guild: GuildData = payload.new as GuildData;
				dispatch(updateGuildData(guild));
			})
			.subscribe();
		const membersSubscription = supabase
			.from(`members:guild=eq.${guildId}`)
			.on("*", (payload) => {
				const member: MemberData = payload.new as MemberData;
				dispatch(addOrUpdateMember(member));
			})
			.subscribe();

		const unsubscribe = () => {
			supabase.removeSubscription(channelsUpdateSubscription);
			supabase.removeSubscription(eventsSubscription);
			supabase.removeSubscription(guildSubscription);
			supabase.removeSubscription(membersSubscription);
			supabase.removeSubscription(messagesSubscription);
			supabase.removeSubscription(voicePresencesSubscription);
			supabase.removeSubscription(rolesSubscription);
		};

		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [guildId]);
};

export { useRealtimeListener };
