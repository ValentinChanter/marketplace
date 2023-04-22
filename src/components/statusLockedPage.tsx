import { User } from "@/pages/api/user";
import checkUserStatus from "@/lib/checkUserStatus";
import Layout from "./layout";
import { Status } from "@prisma/client";
import Router from "next/router";
import { useEffect } from "react";

export default function StatusLockedPage({children, user, status, f}: {children:any, user:User, status: Status, f?: Function}) {
    if (checkUserStatus(user, status)) {
        if (f) f();

        return (
            <>
                { children }
            </>
        );
    } else {
        useEffect(() => {
            Router.push("/");
        })
        return(
            <>
                <Layout pageName={"Non autorisé"} user={user}>
                </Layout>
            </>
        )
    }
    
}