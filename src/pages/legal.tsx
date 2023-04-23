import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"
import Layout from '@/components/layout';

export default function legal({user}: {user:User}) {
	return (
		<Layout pageName="Mentions légales" user={user}>
			<div className='flex flex-col'>
                <p className='text-justify mb-2'>La marketplace Nook est la propriété de Adam, Amandine, Line et Valentin.</p>
                <p className='text-justify mb-2'>Siège social : Avenue du Parc, 95000 Cergy</p>
                <p className='text-justify mb-2'>Téléphone : 06 00 00 00 00</p>
                <p className='text-justify mb-2'>E-mail : nook@cy-tech.fr</p>

                <p className='text-lg font-semibold mt-8'>Limitation de responsabilité</p>
                <p className='text-justify mb-2'>Le propriétaire de ce site web ne saurait être tenu responsable des dommages directs ou indirects, quels qu'ils soient, résultant de l'accès à ce site web ou de son utilisation, y compris notamment toute perte d'exploitation, de profit, de revenu, de contrat, de données ou toute autre perte de nature financière ou commerciale.</p>

                <p className='text-lg font-semibold mt-8'>Liens hypertextes</p>
                <p className='text-justify mb-2'>Le propriétaire de ce site web n'est pas responsable du contenu des sites tiers vers lesquels des liens sont proposés sur ce site web.</p>

                <p className='text-lg font-semibold mt-8'>Politique de confidentialité</p>
                <p className='text-justify mb-2'>Pour plus d'informations sur notre politique de confidentialité, veuillez consulter notre page Politique de Confidentialité.</p>
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