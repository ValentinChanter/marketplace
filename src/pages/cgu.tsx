import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"
import Layout from '@/components/layout';

export default function cgu({user}: {user:User}) {
	return (
		<Layout pageName="Conditions Générales d'Utilisation" user={user}>
			<div className='flex flex-col'>
				<p className='text-justify'>En utilisant ce site web, vous acceptez les présentes Conditions Générales d'Utilisation (CGU) dans leur intégralité. Si vous n'acceptez pas ces CGU, veuillez ne pas utiliser ce site web.</p>

                <p className='text-lg font-semibold mt-8'>Utilisation du site web</p>
                <ol className='list-decimal'>
                    <li className='text-justify'>Vous êtes autorisé à accéder et à utiliser ce site web uniquement à des fins légales et conformément aux présentes CGU.</li>
                    <li className='text-justify'>Vous ne pouvez utiliser ce site web que pour votre usage personnel et non commercial.</li>
                    <li className='text-justify'>Vous acceptez de ne pas utiliser ce site web de manière à violer les droits d'autrui, y compris les droits de propriété intellectuelle, les droits à la vie privée et les droits de publicité.</li>
                    <li className='text-justify'>Vous acceptez de ne pas utiliser ce site web pour diffuser des virus, des chevaux de Troie, des vers ou tout autre code malveillant.</li>
                    <li className='text-justify'>Nous nous réservons le droit de suspendre ou de résilier votre accès à ce site web à tout moment, sans préavis et sans responsabilité envers vous.</li>
                </ol>

                <p className='text-lg font-semibold mt-8'>Propriété intellectuelle</p>
                <ol className='list-decimal'>
                    <li className='text-justify'>Le contenu de ce site web, y compris, sans s'y limiter, les textes, les graphiques, les images, les logos, les icônes de boutons, les logiciels et autres contenus, sont protégés par les lois sur la propriété intellectuelle et appartiennent à leurs propriétaires respectifs.</li>
                    <li className='text-justify'>Vous n'êtes pas autorisé à copier, modifier, reproduire, publier, diffuser, distribuer, vendre ou exploiter de quelque manière que ce soit tout contenu de ce site web sans notre autorisation écrite préalable.</li>
                </ol>

                <p className='text-lg font-semibold mt-8'>Modifications des CGU</p>
                <ol className='list-decimal'>
                    <li className='text-justify'>Nous nous réservons le droit de modifier les présentes CGU à tout moment et sans préavis. Les modifications prendront effet dès leur publication sur ce site web.</li>
                    <li className='text-justify'>Il vous incombe de consulter régulièrement les présentes CGU afin de vous tenir informé des modifications éventuelles.</li>
                </ol>

                <p className='text-lg font-semibold mt-8'>Droit applicable et juridiction compétente</p>
                <ol className='list-decimal'>
                    <li className='text-justify'>Les présentes CGU sont régies par la loi française.</li>
                    <li className='text-justify'>Tout différend relatif aux présentes CGU sera soumis à la compétence exclusive des tribunaux français.</li>
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