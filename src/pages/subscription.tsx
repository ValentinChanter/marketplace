import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useUser from '@/lib/useUser';
import { toast } from 'react-hot-toast';

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
    const router = useRouter();


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
            router.push('/');
            {isSubscribed ? toast.success("Vous avez été désabonné") : toast.success("Vous êtes désormais abonné")};}
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
      <StatusLockedPage user={user} status="CLIENT">
        {isSubscribed ? (
            <Layout pageName={"Mon abonnement"} user={user}>
                <div className="bg-mkWhite p-5 rounded flex flex-col justify-center items-center">
                  <h1 className="text-xl font-bold text-mkDarkBlue">Vous profitez actuellement de notre abonnement Nook Prime !</h1>
    
                  <button
                      onClick={handleSubscriptionToggle}
                      className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange mt-20"
                  >
                      Se désabonner
                  </button>
                </div>
            </Layout>
        ) : (
            <Layout pageName={"S'abonner"} user={user}>
                <div className='flex flex-col space-y-4 items-center w-screen'>
                    <div className=" text-mkDarkBlue p-5 bg-mkGreen rounded flex-1">
                        <h1 className="text-center font-semibold align-top text-3xl">Nook Prime</h1>
        
                        <p>Découvrez tout ce que l'abonnement Nook Prime vous réserve !</p>
                    </div>
        
                    <div className='bg-mkWhite rounded flex-1 p-5 text-lg items-center'>
                        <div className="">
                            <div className='flex flex-row'>
                              <h3 className='text-mkDarkBlue font-bold'>Réductions exclusives </h3>
                              <Image src="/../public/reduc.png" alt="reduc" width="100" height="40" />
                            </div>
                            <p className='text-mkDarkGreen mb-10'>Bénéficiez de réductions réservées aux membres prime sur vos articles préférés.</p>
                        </div>
                        <hr></hr>

                        <div className="mt-10">
                          <div className='flex flex-row'>
                              <h3 className='text-mkDarkBlue font-bold'>Livraison gratuite </h3>
                              <Image src="/../public/vroom.png" alt="vroom" width="50" height="50" className='ml-10 '/>
                            </div>
                            <p className='text-mkDarkGreen'>Profitez d'une livraison gratuite dans toute la France, sans minimum d'achat.</p>
                        </div>
            
                        <button onClick={handleSubscriptionToggle} className="ml-44 w-72 bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange mt-20">
                            S'abonner
                        </button>
                    </div>
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