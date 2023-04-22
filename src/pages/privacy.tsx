import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"
import Layout from '@/components/layout';

export default function privacy({user}: {user:User}) {
	return (
		<Layout pageName="Politique de Confidentialité" user={user}>
			<div className='flex flex-col'>
                <p className='text-lg font-semibold mt-8'>Politique de confidentialité</p>
                <ol className='list-decimal'>
                    <li className='text-justify'>Nous attachons une grande importance à la protection de votre vie privée et nous nous engageons à respecter les dispositions de la loi française sur la protection des données personnelles.</li>
                    <li className='text-justify'>Les données personnelles collectées sur ce site web sont utilisées dans le but de vous fournir les services que vous demandez et de vous informer sur les nouveautés et les offres spéciales.</li>
                    <li className='text-justify'>Nous ne divulguerons jamais vos données personnelles à des tiers sans votre consentement préalable.</li>
                    <li className='text-justify'>Les données personnelles collectées sur ce site web sont stockées sur des serveurs situés en France.</li>
                </ol>

                <p className='text-lg font-semibold mt-8'>Droits de propriété intellectuelle</p>
                <ol className='list-decimal'>
                    <li className='text-justify'>Tous les éléments du site web, y compris les textes, les images, les vidéos, les logos et les marques sont la propriété exclusive de nos partenaires ou de nous-mêmes et sont protégés par les lois françaises et internationales sur la propriété intellectuelle.</li>
                    <li className='text-justify'>Toute reproduction, représentation, modification, publication, adaptation, exploitation commerciale ou non, de tout ou partie des éléments du site web, sans autorisation préalable écrite, est strictement interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.</li>
                </ol>
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