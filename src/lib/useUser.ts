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
    if (!user || !redirectIfFound) return;

    if (user?.isLoggedIn) Router.push(redirection(user).path);
  }, [user, redirectIfFound]);

  return { user, mutateUser };
}