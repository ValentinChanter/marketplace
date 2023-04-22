import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import useUser from '@/lib/useUser';

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

import StatusLockedPage from "@/components/statusLockedPage";

export default function Subscription({user}: {user:User}) {
    const { mutateUser } = useUser({
        redirectIfFound: false,
    });

    const [isSubscribed, setIsSubscribed] = useState(false)

    const handleSubscriptionUpdate = async (mutateUser: Function) => {
        // Faire une requête à l'API en mettant le nouveau statut d'abonnement
        try {
            const res = await axios.put('/api/updateSub', {id:user.id, subscribed: !user.isSubscribed });
            mutateUser(res, false);
            setIsSubscribed(res.data.subscribed);
        } catch (error) {
            console.error(error);
        }
    }

    const updateSubscribed = (mutateUser: Function) => {
        handleSubscriptionUpdate(mutateUser);
        //useRouter().push("/index");
        {user.isSubscribed ? toast.success("Vous êtes désormais désabonné") : toast.success("Vous êtes désormais abonné")};
    }

    return (
        <StatusLockedPage user={user} status='CLIENT'>
            
            {user.isSubscribed ? (
            <Layout pageName={"Mon abonnement"} user={user}>
                <div>
                    <p>Vous profitez actuellement de notre abonnement Next.js Prime !</p>

                    <button onClick={() => updateSubscribed(mutateUser)} className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange">
                            Se désabonner
                    </button>
                </div>
            </Layout>

            ) : (

                <Layout pageName={"S'abonner"} user={user}>
                    <div>
                        <div className=" text-mkDarkGreen p-8">
                            <h1 className="text-center font-semibold align-top text-xl">Next.js Prime</h1>

                            <p className={styles.description}>
                                Découvrez tout ce que l'abonnement Next.js Prime vous réserve !
                            </p>
                        </div>

                        <div className={styles.card}>
                            <h3>
                                Réductions exclusives
                                <Image src='/../public/reduc.png' alt='reduc' width='100' height='40'></Image>
                            </h3>
                            <p>Bénéfissiez de réductions réservées aux membres prime sur vos articles préférés.</p>
                        </div>
                        <div className={styles.card}>
                            <h3>
                                Livraison gratuite 
                                <Image src='/../public/vroom.png' alt='vroom' width='50' height='50'></Image>
                            </h3>
                            <p>Profitez d'une livraison gratuite dans toute la France, sans minimum d'achat.</p>
                        </div>

                        <button onClick={() => updateSubscribed(mutateUser)} className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange">
                            S'abonner
                        </button>
                    </div> 
                </Layout>
            )}

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