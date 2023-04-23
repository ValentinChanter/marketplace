import Layout from '@/components/layout';
import Link from 'next/link';

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

export default function Payment({user}: {user:User}) {
    return (
        <Layout pageName={'Paiement accepté'} user={user}>
            <div className="bg-mkWhite p-5 rounded flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold text-mkDarkBlue">Votre commande a été acceptée !</h1>
                <div className='text-mkDarkBlue mt-8 content-center'>
                  <p >Retrouvez la dans votre espace "Mes commandes"</p>
                  <p className='text-center'>Nous espérons vous revoir bientôt !</p>
                </div>
                <Link href="/products">
                    <button type="button" className="bg-mkOrange cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange rounded mt-20">
                        Continuer vos achats
                    </button>
              </Link>
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