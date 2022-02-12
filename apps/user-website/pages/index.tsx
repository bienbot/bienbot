import styled from "styled-components";
import firebaseApp from "../services/firebase";
import {
    getFirestore,
    query,
    where,
    updateDoc,
    doc,
    onSnapshot,
    collection,
    setDoc,
    deleteDoc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import React from "react";
import Head from "next/head";

const database = getFirestore(firebaseApp);

const getData = async () => {
    const channelStatsRef = doc(database, "386659530999726090", "channelStats");
    const channelStatsSnap = await getDoc(channelStatsRef);
    let minuteData = {};
    if (channelStatsSnap.exists()) {
        const docData = channelStatsSnap.data();
        for (const channelId in docData) {
            for (const user in docData[channelId]) {
                minuteData[user] = minuteData[user]
                    ? docData[channelId][user].length + minuteData[user]
                    : docData[channelId][user].length;
            }
        }
    }
    let userData = {};
    const usersRef = doc(database, "386659530999726090", "users");
    const usersSnap = await getDoc(usersRef);
    if (usersSnap.exists()) {
        const docData = usersSnap.data();
        for (const userId in docData) {
            userData[userId] = docData[userId];
        }
    }
    return {
        minuteData,
        userData,
    };
};

function Index() {
    const [data, setData] = React.useState<any>();

    React.useEffect(() => {
        getData().then((data) => {
            setData(data);
        });
    }, []);

    if (!data) return <div>loading</div>;

    return (
        <>
            <Head>
                <link href="/fonts/UniSansHeavy.otf" />
            </Head>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    marginLeft: "2rem",
                }}
            >
                {Object.keys(data.minuteData)
                    .sort((a, b) => data.minuteData[b] - data.minuteData[a])
                    .map((k) => (
                        <UserCard
                            key={k}
                            user={data.userData[`${k}`]}
                            minutes={data.minuteData[k]}
                        />
                    ))}
            </div>
        </>
    );
}

const UserCard = ({ user, minutes }: { user: any; minutes: number }) => {
    return user.bot ? null : (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: 32,
                fontFamily: "Whitney",
            }}
        >
            <img width={64} src={user.avatar} />
            <div>{minutes}</div>
            <div style={{ color: user.displayColor }}>{user.displayName}</div>
        </div>
    );
};

export default Index;
