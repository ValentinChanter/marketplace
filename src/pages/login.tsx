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
  // On détermine où rediriger l'utilisateur lorsqu'il est connecté, selon son statut
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

            setErrorMsg("");

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
        <button onClick={() => Router.push("/signup")} className='text-white border-solid border-3 border-gray-800 rounded bg-mkOrange hover:bg-[#e7a08c] focus:ring-2 focus:ring-orange-300 py-2 my-1 w-full'>S'inscrire</button>
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