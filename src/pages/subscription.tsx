import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUser from '@/lib/useUser';

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

import StatusLockedPage from "@/components/statusLockedPage";
import fetchJson from '@/lib/fetchJson';

export default function Subscription({user}: {user:User}) {
    const { mutateUser } = useUser({
      redirectIfFound: false,
    });
  
    const [isSubscribed, setIsSubscribed] = useState(false);
  
    useEffect(() => {
        // Récupérer la valeur de isSubscribed dans localStorage
        const storedIsSubscribed = localStorage.getItem('isSubscribed');
        if (storedIsSubscribed && storedIsSubscribed !== 'undefined' && storedIsSubscribed !== 'null') {
          // L'appliquer au useState()
          setIsSubscribed(JSON.parse(storedIsSubscribed));
        }
      }, []);
  
    const handleSubscriptionToggle = async () => {
        try {
          const body = { id: user.id, subscribed: !isSubscribed };
          const res = await mutateUser(
            await fetchJson('/api/updateSub', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            }),
            false
          );
          if (res) {
            setIsSubscribed(res.isSubscribed);
            localStorage.setItem('isSubscribed', JSON.stringify(res.isSubscribed));
          }
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
      <StatusLockedPage user={user} status="CLIENT">
        {isSubscribed ? (
            <Layout pageName={"Mon abonnement"} user={user}>
                <div>
                <p>Vous profitez actuellement de notre abonnement</p>
    
                <button
                    onClick={handleSubscriptionToggle}
                    className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange"
                >
                    Se désabonner
                </button>
                </div>
            </Layout>
        ) : (
            <Layout pageName={"S'abonner"} user={user}>
                <div>
                <div className=" text-mkDarkGreen p-8">
                    <h1 className="text-center font-semibold align-top text-xl">Nook Prime</h1>
    
                    <p className={styles.description}>Découvrez tout ce que l'abonnement Nook Prime vous réserve !</p>
                </div>
    
                <div className={styles.card}>
                    <h3>
                    Réductions exclusives
                    <Image src="/../public/reduc.png" alt="reduc" width="100" height="40" />
                    </h3>
                    <p>Bénéfissiez de réductions réservées aux membres prime sur vos articles préférés.</p>
                </div>
                <div className={styles.card}>
                    <h3>
                    Livraison gratuite
                    <Image src="/../public/vroom.png" alt="vroom" width="50" height="50" />
                    </h3>
                    <p>Profitez d'une livraison gratuite dans toute la France, sans minimum d'achat.</p>
                </div>
    
                <button
                    onClick={handleSubscriptionToggle}
                    className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange"
                >
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