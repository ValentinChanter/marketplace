import Link from "next/link";
import React from "react";
import { FC } from "react";
import Image from "next/image";

import { useStateContext } from "../../../context/StateContext";

export const ProductItem: FC<{ product: any }> = ({ product }) => {
  const { qty, incQty, decQty, addToCart } = useStateContext();
  const name = product.product.name;
  const desc = product.product.desc;
  const price = product.price;
  const sellerfirstName = product.seller.firstName;
  const sellerName = product.seller.lastName;
  const thumbnail = product.product.imgUrl;
  const delivery = product.seller.estDeliveryTime;
  const stock = product.quantity;

  return (
    <div className="flex justify-start gap-10 bg-mkWhite text-mkDarkBlue mx-40 my-20 p-10">
      <Image
        src={thumbnail}
        alt={name}
        width={400}
        height={400}
        className="w-[400px] h-[400px]"
      />
      <div>
        <div className="font-bold text-3xl "> {name} </div>
        <div className="italic">
          {" "}
          {sellerfirstName} {sellerName}{" "}
        </div>
        <div className="text-mkDarkOrange font-semibold text-lg my-3">
          {price}€
        </div>

        <div>{desc}</div>
        <div className="mt-3"> livraison estimée : {delivery} jours</div>

        <div className="font-semibold italic">
          <Link
            href={{
              pathname: "../compare/[id]",
              query: {
                id: product.productId,
              },
            }}
          >
            {" "}
            Comparer
          </Link>
        </div>
        <div className="mt-5">
          Quantité :
          <div className="border-mkGreen border w-fit ">
            <button
              onClick={decQty}
              className="bg-mkGreen  text-mkDarkBlue px-2 hover:bg-mkDarkGreen hover:text-mkWhite "
            >
              -
            </button>
            <span className="mx-2">{qty}</span>
            <button
              onClick={() => incQty(stock)}
              className="bg-mkGreen text-mkDarkBlue px-2 hover:bg-mkDarkGreen hover:text-mkWhite "
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={() => addToCart(product, qty)}
          className=" mt-5 relative overflow-hidden bg-transparent text-center uppercase text-base transition-[0.3s] z-[1] text-mkDarkGreen px-[1.8em] py-[0.8em] border-2 border-solid border-mkDarkGreen before:content-[''] before:w-0 before:h-[300%] before:absolute before:-translate-x-2/4 before:-translate-y-2/4 before:rotate-45 before:transition-[0.5s] before:duration-[ease] before:block before:z-[-1] before:left-2/4 before:top-2/4 hover:before:w-[105%] hover:text-white before:bg-mkDarkGreen"
        >
          {" "}
          Add to cart
        </button>
      </div>
    </div>
  );
};
