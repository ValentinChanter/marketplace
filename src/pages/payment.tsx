import Layout from '@/components/layout';
import Link from 'next/link';

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

export default function Payment({user}: {user:User}) {
    return (
        <Layout pageName={'Paiement accepté'} user={user}>
            <main>
                <h1>Votre commande a été acceptée !</h1>
                <p>Retrouvez la dans votre espace "Mes commandes"</p>
                <Link href="/products">
                    <button type="button" className="bg-mkOrange cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange">
                        Continuer vos achats
                    </button>
              </Link>
            </main>
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