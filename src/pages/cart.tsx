import React, { FC } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import Image from 'next/image';
import { useStateContext } from '../../context/StateContext';

import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import { User } from "@/pages/api/user"

export default function Cart({user}: {user:User}) {
  const { cartItems, totalQty, totalPrice, removeFromCart, toggleQty } = useStateContext();

  return (
    <Layout pageName={'Panier'} user={user}>
      <main>
        
        {/* Si le panier est vide */}
        <div className="flex justify-center">
          {cartItems.length === 0 && (
            <div>
              {/* <Image src="/../public/cart.png" alt="cart" width="150" height="150" /> */}
              <h1> Votre panier est vide</h1>

              <Link href="/products">
                <button type="button" className="bg-mkOrange cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange">
                  Continuer vos achats
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Sinon */}
        <div>
          {cartItems.length >= 1 &&
            cartItems.map((product: any) => (
              <div key={product.id} className="flex justify-center">
                <img src={product.product.thumbnail} alt={product.name} className="w-auto max-h-48 object-cover rounded-lg" />
                <div className="flex justify-between text-mkDarkGreen">
                  <h3>{product.product.name}</h3>
                  <h2 className="font-bold">{product.price}€</h2>
                  
                </div>
                <div className="flex justify-between">
                  <p>Quantité :</p>
                  <button onClick={() => toggleQty(product, 'dec')}>-</button>
                  <span>{product.quant}</span>
                  <button onClick={() => toggleQty(product, 'inc')}>+</button>
                </div>

                <div className="text-xs">
                  <button type="button" onClick={() => removeFromCart(product)}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          {cartItems.length >= 1 && (
            <div>
              <h3>{totalQty} article(s)</h3>
              <h3>Total : {totalPrice}€</h3>
              <Link href="/checkout">
                <button type="button" className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange">
                  Commander
                </button>
              </Link>

              <Link href="/products">
                <button type="button" className="bg-mkWhite text-mkDarkOrange border-mkOrange border-1 cursor-pointer text-base px-7 py-2">
                  Continuer vos achats
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

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