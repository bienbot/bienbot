import * as React from "react";
import { useRouter } from "next/router";

export function Index() {
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
            } else {
                router.push("/login");
            }
        };

        fetchUserStatus();
    }, []);

    return <div></div>;
}

export default Index;
