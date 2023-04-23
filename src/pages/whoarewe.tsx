import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"
import Layout from '@/components/layout';

export default function whoarewe({user}: {user:User}) {
	return (
		<Layout pageName="Qui sommes-nous ?" user={user}>
			<div className='flex flex-col'>
				<p className='text-2xl font-bold mb-8'>Bienvenue sur notre Marketplace !</p>
				<p className='mb-2 text-justify'>Nous sommes une équipe d'étudiants en ING1 GI composée d'Adam, Amandine, Line et Valentin. Notre Marketplace a été créée avec Next.js, une plateforme de développement web basée sur React qui permet de construire des applications web performantes et évolutives. Nous avons également utilisé TypeScript, un langage de programmation qui facilite la maintenance en typant notre code</p>
				<p className='text-justify'>Notre objectif est de proposer une plateforme de vente en ligne qui offre une expérience utilisateur agréable et intuitive. Nous sommes ravis de vous accueillir et vous souhaitons de bons achats !</p>
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