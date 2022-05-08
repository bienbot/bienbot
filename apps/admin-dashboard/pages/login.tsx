import * as React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LoginPage } from "apps/admin-dashboard/components/LoginPage";

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

    return <LoginPage />;
};

export default LogInPage;
