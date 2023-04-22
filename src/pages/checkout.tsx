import Link from "next/link";
import Layout from "@/components/layout";
import { useStateContext } from "../../context/StateContext";
import { FormEvent } from "react";

import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user";

import StatusLockedPage from "@/components/statusLockedPage";

async function onSubmit() { {
    
}
    
}

export default function Checkout({user}: {user:User}) {

    const { cartItems, totalPrice, totalQty} = useStateContext();
    let shipping;

    return(
        // Utilisateur renvoyé à la page de login si non connecté
        <StatusLockedPage user={user} status="CLIENT">
            <Layout pageName="Checkout" user={user}>
                <main className="">
                    <h1 className="text-xl">Récapitulatif de votre commande</h1>
                    <div className="">
                        <div>
                            {cartItems.map((product: any) => (
                                <div key={product.id} className="flex justify-center">
                                    <img src={product.product.thumbnail} alt={product.name} className="w-auto max-h-48 object-cover rounded-lg" />
                                    <div className="flex justify-between text-mkDarkGreen">
                                        <h3>{product.quant}x {product.product.name}</h3>
                                        <h2 className="font-bold mx-20">{product.price * product.quant}€</h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h1>Adresse de livraison</h1>
                        <div className="flex justify-center w-3/5"> 
                            <form onSubmit={onSubmit}>
                                <label className="block"> Adresse : 
                                    <input type="text" name="adress" required className="border"/>
                                </label>
                                <label className="block"> Code postal: 
                                    <input type="text" name="postalCode" required className="border"/>
                                </label>
                                <label className="block"> Ville: 
                                    <input type="text" name="city" required className="border"/>
                                </label>

                                <div>
                                    <p> Livraison : {user.isSubscribed ? shipping = 0 : shipping = 15 }€</p>
                                </div>

                                <div>
                                    <h3>{totalQty} articles</h3>
                                    <h2 className="text-lg justify-center text-mkDarkOrange font-bold">Total : {totalPrice + shipping} €</h2>
                                </div>

                                <button type="submit" className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange">
                                    Confirmer la commande
                                </button>
                            </form>
                        </div>
                    </div>
                
                </main>
            </Layout>
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