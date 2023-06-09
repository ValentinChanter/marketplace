import { User } from "@/pages/api/user";
import { Status } from "@prisma/client";
import Router from "next/router";
import { useEffect } from "react";

// Vérifie que user a le bon statut, renvoie true si c'est bon, redirige vers /login et renvoie false sinon
export default function checkUserStatus(user: User, status: Status) {
    if (!user || user === null || user.status !== status) {
        useEffect(() => {
            Router.push("/login");
        });
        return false;
    } else return true;
}