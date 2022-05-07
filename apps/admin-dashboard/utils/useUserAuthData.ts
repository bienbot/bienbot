import { useRouter } from "next/router";
import * as React from "react";

const useUserAuthData = () => {
    const router = useRouter();
    const [userData, setUserData] = React.useState<any>({});

    React.useEffect(() => {
        const fetchUserStatus = async () => {
            const response = await fetch(
                "http://localhost:3000/api/auth/status",
                {
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (!data.id) {
                router.push("/login");
            } else {
                setUserData(data);
            }
        };
        fetchUserStatus();
    }, []);

    return userData;
};

export default useUserAuthData;
