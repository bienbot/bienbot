import { GuildData, MessageData } from "@bienbot/types";
import {
    collection,
    getFirestore,
    onSnapshot,
    query,
} from "firebase/firestore";
import * as React from "react";
import { useDispatch } from "react-redux";
import firebaseApp from "../../services/firebase";
import { updateData, updateGuild } from "./guildDataSlice";

const database = getFirestore(firebaseApp);

/**
 * This hook is used to listen to the firebase database and update the state
 * when the data changes.
 * @param guildId The guild id to listen to.
 */
const useFirebaseListener = ({ id }: { id: string }) => {
    const dispatch = useDispatch();

    // Update guild data when it changes
    React.useEffect(() => {
        if (id) {
            const q = query(collection(database, id));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = {};

                snapshot.docs.forEach((doc) => {
                    if (doc.id !== "data") {
                        data[doc.id] = doc.data();
                    }
                });
                dispatch(updateGuild(data));
            });

            return unsubscribe;
        }
    }, [id]);

    // Update messages when they change
    React.useEffect(() => {
        if (id) {
            const unsubscribe = onSnapshot(
                collection(database, id, "data", "messages"),
                (snapshot) => {
                    const messages: Record<string, MessageData> = {};
                    snapshot.docs.forEach((doc) => {
                        messages[doc.id] = doc.data() as MessageData;
                    });
                    dispatch(updateData({ id: "messages", data: messages }));
                }
            );
            return unsubscribe;
        }
    }, [id]);

    // Update events when they change
    React.useEffect(() => {
        if (id) {
            const unsubscribe = onSnapshot(
                collection(database, id, "data", "events"),
                (snapshot) => {
                    const events: Record<string, MessageData> = {};
                    snapshot.docs.forEach((doc) => {
                        events[doc.id] = doc.data() as MessageData;
                    });
                    dispatch(updateData({ id: "events", data: events }));
                }
            );
            return unsubscribe;
        }
    }, [id]);

    // Update voicePresence when it changes
    React.useEffect(() => {
        if (id) {
            const unsubscribe = onSnapshot(
                collection(database, id, "data", "voicePresence"),
                (snapshot) => {
                    const voicePresence: Record<string, MessageData> = {};
                    snapshot.docs.forEach((doc) => {
                        voicePresence[doc.id] = doc.data() as MessageData;
                    });
                    dispatch(
                        updateData({ id: "voicePresence", data: voicePresence })
                    );
                }
            );
            return unsubscribe;
        }
    }, [id]);
};

export default useFirebaseListener;
