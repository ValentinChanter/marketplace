import React from "react";
import {FC} from 'react'

export const ProductItem: FC<{product:any}> = ({product}) =>{
    const name = product.product.name;
    const desc = product.product.desc; 
    const price = product.price;
    const thumbnail = product.product.thumbnail;
    const sellerName = product.seller.name;


    return(
        <div>
            <img src={thumbnail} alt={name}/>
            <div > {name} </div>
            <div>{price}€</div>
            <div> {sellerName} </div>
            <div>{desc}</div>
            <button> Add to cart</button>
        </div>

    )
}