import * as React from "react";
import type { NextPage } from "next";
import { LoginPage } from "apps/admin-dashboard/components/LoginPage";
import { supabase } from "../services/supabase";

const LogInPage: NextPage = () => {
    return <LoginPage />;
};

export const getServerSideProps = async ({ req }) => {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    if (!user) {
        return {
            props: {},
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/servers",
        },
        props: {},
    };
};

export default LogInPage;
