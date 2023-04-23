import React from "react";
import {FC} from 'react'
import { useStateContext } from "../../../context/StateContext";
import Link from 'next/link';



export const ProductComp: FC<{product:any}> = ({product}) =>{
    const {qty, incQty, decQty, addToCart} = useStateContext();
    console.log(product);
    
    const name = product.product.name;
    const price = product.price;
    const sellerfirstName = product.seller.firstName;
    const sellerName = product.seller.lastName;
    const thumbnail = product.product.imgUrl;
    const stock = product.quantity;
    const delivery = product.seller.estDeliveryTime



    return(
        <div className="bg-mkWhite shadow-md rounded-l-md w-full mt-2 mb-2 flex flex-col bg-clip-border p-4">
            <img src={thumbnail} alt={name}  className="w-auto max-h-48 object-cover rounded-l-md"/>
            <div className='flex justify-between'>
                <div className="font-semibold"> <Link href={{
                    pathname: '/product/[id]',
                    query:{
                        id: product.id
                    }
                }}>{name}</Link></div>
                <div className='text-mkDarkOrange font-bold'>{price}€</div>
            </div>
            <div className="italic"> {sellerfirstName} {sellerName}</div>
            <div className="flex justify-between">
            <div> livraison estimée : {delivery} jours</div>
            
            {/* <div className="mt-5">
                <p>Quantité :</p>
                <div className="border-mkDarkGreen border w-fit ">
                <button onClick={decQty} className="bg-mkDarkGreen  text-mkWhite px-2 hover:bg-mkGreen hover:text-mkDarkBlue ">-</button>
                <span className="mx-2">{qty}</span>
                <button onClick={() => incQty(stock)} className="bg-mkDarkGreen text-mkWhite px-2 hover:bg-mkGreen hover:text-mkDarkBlue ">+</button>
                </div>
            </div> */}
            <button onClick={() => addToCart(product,qty)} className="bg-mkGreen p-1 rounded-full hover:bg-mkDarkGreen"> <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2m-8-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m1.35 8H5.5c-.92 0-1.69-.62-1.92-1.46l-2.54-9.27C1 10.18 1 10.09 1 10c0-.55.45-1 1-1h4.79l4.38-6.55a.997.997 0 0 1 1.66-.01L17.21 9H22c.55 0 1 .45 1 1l-.03.27l-.97 3.54c-.57-.31-1.21-.57-1.88-.7L20.7 11H3.31l2.19 8H13c0 .7.13 1.37.35 2M9.2 9h5.6L12 4.8L9.2 9Z"></path></svg></button>
            </div>
            
        </div>
    )
}