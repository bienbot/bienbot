import firebaseApp from "../services/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import React from "react";
import Head from "next/head";
import { countMinutes, getUserData } from "@bienbot/functions";
import { UserData } from "@bienbot/types";

const database = getFirestore(firebaseApp);

type getDataReturnType = {
    minuteData: Record<string, number>;
    userData: Record<string, UserData>;
};

function Index() {
    const [data, setData] = React.useState<getDataReturnType | null>(null);
    React.useEffect(() => {
        getData().then((data) => {
            setData(data);
        });
    }, []);

    if (data === null) return <div>loading</div>;

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

const UserCard = ({ user, minutes }: { user: UserData; minutes: number }) => {
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

const getData = async (): Promise<getDataReturnType> => {
    const channelStatsSnap = await getDoc(
        doc(database, "386659530999726090", "channelStats")
    );
    const usersSnap = await getDoc(
        doc(database, "386659530999726090", "users")
    );
    if (!channelStatsSnap.exists || !usersSnap.exists) return;
    const minuteData = countMinutes({ docData: channelStatsSnap.data() });
    const userData = getUserData({
        docData: usersSnap.data(),
        users: [...Object.keys(minuteData)],
    });

    return {
        minuteData,
        userData,
    };
};

export default Index;
