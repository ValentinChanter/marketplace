import { useState } from "react";
import Layout from '@/components/layout';
import SignupForm from '@/components/signupForm';
import fetchJson, { FetchError } from "@/lib/fetchJson";

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

export default function Login({user}: {user:User}) {
    const [errorMsg, setErrorMsg] = useState("");

    return (
        <>
            <Layout pageName={"Inscription"} user={user}>
                <div className="w-1/2 border-solid border-2 rounded p-5 my-auto">
                    <p className="font-semibold text-lg mb-8">Pas encore inscrit ?</p>
                    <SignupForm 
                        errorMessage={errorMsg}
                        onSubmit={async function handleSubmit(event) {
                            event.preventDefault();
                
                            const body = {
                                firstName: event.currentTarget.firstName.value,
                                lastName: event.currentTarget.lastName.value,
                                email: event.currentTarget.email.value,
                                password: event.currentTarget.password.value,
                            };
                
                            try {
                                fetchJson("/api/signup", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(body),
                                })
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