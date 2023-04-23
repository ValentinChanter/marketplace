import Layout from "@/components/layout";
import { useStateContext } from "../../context/StateContext";
import axios from "axios";
import { useRouter } from "next/router";

import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user";
import checkUserStatus from "@/lib/checkUserStatus";

import StatusLockedPage from "@/components/statusLockedPage";


export default function Checkout({user}: {user:User}) {

    if(checkUserStatus(user, "CLIENT")) {

        const storedIsSubscribed = localStorage.getItem('isSubscribed');
        const isSubscribed = storedIsSubscribed ? JSON.parse(storedIsSubscribed) : false;
        
        const router = useRouter();
        const { cartItems, totalPrice, totalQty, setCartItems, setTotalPrice, setTotalQty} = useStateContext();

        let shipping = (isSubscribed ? 0 : 15);

        const handleSubmit = async (event) => { {
            event.preventDefault();

            const data = {
                address: event.currentTarget.address.value,
                postalCode: event.currentTarget.postalCode.value,
                city: event.currentTarget.city.value,
                price: totalPrice + shipping,
                buyerId: user.id,
                deliveryManId: 'clgp7h060000iukhsax712vv0',
                orderItems: cartItems.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    price: item.price,
                    sellerId: item.sellerId,
                    id: item.id,
                }))
            }
            try {
                // Envoyer les données à l'api 
                const res = await axios.post('/api/order', data);
                //Reset le panier
                setCartItems([]);
                setTotalPrice(0);
                setTotalQty(0);
                
                router.push('/payment');
            } catch (error) {
                console.log(error);
            }
        }}

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
                                <form onSubmit={handleSubmit}>
                                    <label className="block"> Adresse : 
                                        <input type="text" name="address" required className="border"/>
                                    </label>
                                    <label className="block"> Code postal: 
                                        <input type="text" name="postalCode" required className="border"/>
                                    </label>
                                    <label className="block"> Ville: 
                                        <input type="text" name="city" required className="border"/>
                                    </label>

                                    <div>
                                        <p> Livraison : {shipping}€</p>
                                    </div>

                                    <div>
                                        <h3>{totalQty} articles</h3>
                                        <h2 className="text-lg justify-center text-mkDarkOrange font-bold">Total : {totalPrice + shipping } €</h2>
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