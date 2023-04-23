import { useState } from "react";
import useUser from "@/lib/useUser";
import Layout from "@/components/layout";
import LoginForm from "@/components/loginForm";
import fetchJson, { FetchError } from "@/lib/fetchJson";
import Router from "next/router";

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

export default function Login({user}: {user:User}) {
	// On redirige l'utilisateur s'il est déjà connecté
	const { mutateUser } = useUser({
		redirectIfFound: true,
	});

	const [errorMsg, setErrorMsg] = useState("");

	return (
		<Layout pageName={"Connexion"} user={user}>
			<div className="w-1/3 border-solid border-2 rounded p-5 my-0">
				
				<p className="font-semibold text-lg">Déjà client ?</p>
				<br />
				<LoginForm
					errorMessage={errorMsg}
					onSubmit={async function handleSubmit(event) {
						event.preventDefault();

						setErrorMsg(""); // Réinitialisation du message d'erreur entre chaque tentative

						const body = {
							email: event.currentTarget.email.value,
							password: event.currentTarget.password.value,
						};

						try {
							mutateUser(
								await fetchJson("/api/login", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify(body),
								}),
								false,
							);
						} catch (error) {
							if (error instanceof FetchError) {
								setErrorMsg(error.data.message);
							} else {
								console.error("An unexpected error happened:", error);
							}
						}
					}}
				/>
				
				<br /><hr /><br />
				<p className="font-semibold text-lg">Pas encore inscrit ?</p>
				<br />
				<button onClick={() => Router.push("/signup")} className="text-mkDarkBlue w-full rounded-md bg-mkOrange p-2 text mr-5 hover:bg-[#e7a08c] shadow active:shadow-sm hover:shadow-md hover:-translate-y-1 active:-translate-y-0 active:bg-mkOrange transition-all">S'inscrire</button>
			</div>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		const user = req.session.user;

		return {
			props: {
				user: user || null,
			},
		};
	}, sessionOptions
);