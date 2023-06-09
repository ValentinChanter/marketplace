import React, { FC } from "react";
import Link from "next/link";
import Layout from "@/components/layout";
import Image from "next/image";
import { useStateContext } from "../../context/StateContext";

import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { User } from "@/pages/api/user";

export default function Cart({ user }: { user: User }) {
  const { cartItems, totalQty, totalPrice, removeFromCart, toggleQty } =
    useStateContext();

  return (
    <Layout pageName={"Panier"} user={user}>
      <main>
        {/* Si le panier est vide */}
        <div className="flex justify-center mt-20">
          {cartItems.length === 0 && (
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-mkDarkBlue"
                width="4em"
                height="4em"
                viewBox="0 0 24 24"
              >
                <path d="M2.39 1.73L1.11 3l5.81 5.81l-.13.19H2c-.55 0-1 .45-1 1c0 .09 0 .18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.18 0 .36-.04.53-.08l1.81 1.81l1.27-1.27L2.39 1.73M5.5 19l-2.19-8h5.8l2.15 2.15C10.5 13.44 10 14.16 10 15c0 1.1.9 2 2 2c.84 0 1.56-.5 1.85-1.26L17.11 19H5.5M23 10l-.03.27l-2.04 7.46l-1.63-1.63l1.4-5.1h-6.5l-2-2h2.6L12 4.8l-1.6 2.4l-1.44-1.44l2.21-3.31a.997.997 0 0 1 1.66-.01L17.21 9H22c.55 0 1 .45 1 1Z"></path>
              </svg>
              <h1 className="mb-3"> Votre panier est vide</h1>

              <Link href="/">
                <button
                  type="button"
                  className="bg-mkOrange cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange"
                >
                  Continuer vos achats
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Sinon */}
        <div className="mx-48 ">
          {cartItems.length >= 1 &&
            cartItems.map((product: any) => (
              <div key={product.id}>
                <div className="grid grid-cols-5 gap-3  pt-2 bg-mkWhite mb-4 shadow-md">
                  <img
                    src={product.product.imgUrl}
                    alt={product.name}
                    className="w-auto mb-2 ml-2 max-h-36 object-cover rounded-sm"
                  />
                  <div className="flex justify-between m-7">
                    <h3>{product.product.name}</h3>
                    <h2 className="font-bold text-mkDarkOrange">
                      {product.price}€
                    </h2>
                  </div>
                  <div className="flex justify-between m-7">
                    <p>Quantité :</p>
                    <div className="border-mkGreen border w-fit h-fit">
                      <button
                        onClick={() => toggleQty(product, "dec")}
                        className="bg-mkGreen  text-mkDarkBlue px-2 hover:bg-mkDarkGreen hover:text-mkWhite "
                      >
                        -
                      </button>
                      <span className="mx-2">{product.quant}</span>
                      <button
                        onClick={() => toggleQty(product, "inc")}
                        className="bg-mkGreen text-mkDarkBlue px-2 hover:bg-mkDarkGreen hover:text-mkWhite "
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-xs m-7">
                    <button
                      type="button"
                      onClick={() => removeFromCart(product)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex mx-48">
          {cartItems.length >= 1 && (
            <div className=" w-full">
              <h3>{totalQty} article(s)</h3>
              <h3 className="font-bold text-mkDarkOrange my-2">
                Total : {Number(totalPrice).toFixed(2)}€
              </h3>
              <div className="flex justify-between w-full">
                <div>
                  <Link href="/">
                    <button
                      type="button"
                      className="bg-mkWhite text-mkDarkOrange border-mkOrange border-1 cursor-pointer text-base px-7 py-2"
                    >
                      Continuer vos achats
                    </button>
                  </Link>
                </div>
                <div className="self-end">
                  <Link href="/checkout">
                    <button
                      type="button"
                      className="bg-mkOrange rounded cursor-pointer text-base px-7 py-2 hover:bg-mkDarkOrange"
                    >
                      Commander
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    return {
      props: {
        user: user || null,
      },
    };
  },
  sessionOptions
);
