import { User } from "@/pages/api/user";
import { Status } from "@prisma/client";
import Router from "next/router";
import { useEffect } from "react";

// Vérifie que user a le bon statut, renvoie true si c'est bon, redirige vers / et renvoie false sinon
export default function checkUserStatus(user: User, status: Status) {
    useEffect(() => {
        if (!user || user.status !== status) Router.push("/");
    }, [user]);

}