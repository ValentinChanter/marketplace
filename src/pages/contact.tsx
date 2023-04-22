import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"
import Layout from '@/components/layout';

export default function privacy({user}: {user:User}) {
	return (
		<Layout pageName="Contact" user={user}>
			<div className='flex flex-col'>
                <p className='text-justify'>N'hésitez pas à nous contacter à l'adresse e-mail suivante : marketplace@cy-tech.fr. Nous ferons de notre mieux pour répondre à vos demandes dans les meilleurs délais.</p>
			</div>
		</Layout>
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