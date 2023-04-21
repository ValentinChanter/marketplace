import { User } from "./api/user";
import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import Layout from "@/components/layout";
import StatusLockedPage from "@/components/statusLockedPage";
import fetchJson from "@/lib/fetchJson";

export default function Delivery({user}: {user:User}) {
	return (
		<StatusLockedPage user={user} status="DELIVERY" f={() => {
			const body = {
				id: user.id,
			};
		
			fetchJson("/api/delivery", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			}).then(res => console.log(res))
		}}>
			<Layout pageName={"Mes livraisons"} user={user}>
				test
			</Layout>
		</StatusLockedPage>
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