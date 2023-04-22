import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { User } from "@/pages/api/user";
import redirection from "./redirection";

export default function useUser({
	redirectIfFound = false,
} = {}) {
	const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");

	useEffect(() => {
		if (!user || !redirectIfFound) return; // Si il n'y a pas d'user ou qu'on ne veut pas redirect, alors on ne fait rien

		if (user?.isLoggedIn) Router.push(redirection(user).path); // Sinon, on redirige, si l'utilisateur est connecté, vers son chemin (selon son statut)
	}, [user, redirectIfFound]);

	return { user, mutateUser };
}