import * as React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const LogInPage: NextPage = () => {
    const router = useRouter();

    React.useEffect(() => {
        const fetchUserStatus = async () => {
            const response = await fetch(
                "http://localhost:3000/api/auth/status",
                {
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (data.id) {
                router.push("/servers");
            }
        };

        fetchUserStatus();
    }, []);

    return (
        <div>
            <div>
                <h1>BienBot</h1>
                <span>Discord bot dashboard</span>
            </div>
            <div>
                <span>You are not logged in</span>
                <button onClick={handleLogIn}>Log in with Discord</button>
            </div>
        </div>
    );
};

const handleLogIn = async () => {
    const response = await fetch("http://localhost:3000/api/auth/status", {
        credentials: "include",
    });
    const data = await response.json();
    if (data.msg == "Unauthorized") {
        window.location.href = "http://localhost:3000/api/auth/discord";
    }
};

export default LogInPage;
