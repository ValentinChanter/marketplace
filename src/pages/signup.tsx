import { useState } from "react";
import Layout from '@/components/layout';
import SignupForm from '@/components/signupForm';
import fetchJson, { FetchError } from "@/lib/fetchJson";

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"
import Router from "next/router";

export default function Login({user}: {user:User}) {
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    return (
        <>
            <Layout pageName={"Inscription"} user={user}>
                <div className="w-1/2 border-solid border-2 rounded p-5 my-auto">
                    <p className="font-semibold text-lg mb-8">Pas encore inscrit ?</p>
                    <SignupForm 
                        errorMessage={errorMsg}
                        successMessage={successMsg}
                        onSubmit={async function handleSubmit(event) {
                            const sMsg = "Inscription réussie ! Vous serez redirigé dans quelques instants...";

                            event.preventDefault();
                            if (successMsg === sMsg) return; // Si l'inscription est déjà réussie (i.e. si sMsg est actuellement affiché), on veut empêcher les interactions entre l'utilisateur et le bouton

                            setErrorMsg("");
                
                            const body = {
                                firstName: event.currentTarget.firstName.value,
                                lastName: event.currentTarget.lastName.value,
                                email: event.currentTarget.email.value,
                                password: event.currentTarget.password.value,
                            };
                
                            try {
                                const res:any = await fetchJson("/api/signup", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(body),
                                });

                                if (res.ok) {
                                    setSuccessMsg(sMsg);
                                    setTimeout(() => Router.push("/login"), 3000);
                                }
                            } catch (error) {
                                if (error instanceof FetchError) {
                                    setErrorMsg(error.data.message);
                                } else {
                                    console.error("An unexpected error happened:", error);
                                }
                            }
                        }}
                    />
                </div>
            </Layout>
        </>
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