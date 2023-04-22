import Link from "next/link";
import React from "react";
import {FC} from 'react'

export const ProductItem: FC<{product:any}> = ({product}) =>{
    const name = product.product.name;
    const desc = product.product.desc; 
    const price = product.price;
    const sellerfirstName = product.seller.firstName;
    const sellerName = product.seller.lastName;
    const thumbnail = product.product.thumbnail;
    const delivery = product.seller.estDeliveryTime



    return(
        <div>
            <img src={thumbnail} alt={name}/>
            <div > {name} </div>
            <div>{price}€</div>
            <div> {sellerfirstName} {sellerName} </div>
            <div> livraison estimée : {delivery} jours</div>
            <div>{desc}</div>
            <Link href={{
                    pathname: '../compare/[id]',
                    query:{
                        id: product.productId
                    }
                }}> Comparer plo plop </Link>
            <button> Add to cart</button>
        </div>

    )
}