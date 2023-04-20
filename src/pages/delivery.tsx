import checkUserStatus from "@/lib/checkUserStatus";
import { User } from "./api/user";
import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import Layout from "@/components/layout";
import fetchJson from "@/lib/fetchJson";

export default function Delivery({user}: {user:User}) {
    checkUserStatus(user, "DELIVERY");

	const body = {
		id: user.id,
	};

	fetchJson("/api/delivery", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	}).then(res => console.log(res))

    return(
        <>
            <Layout pageName={"Mes livraisons"} user={user}>
				test
            </Layout>
        </>
    )
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