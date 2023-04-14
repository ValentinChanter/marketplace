import React from "react";
import {FC} from 'react'

export const ProductItem: FC<{product:any}> = ({product}) =>{
    const name = product.name;
    const desc = product.desc; 
    const price = product.price;
    const thumbnail = product.thumbnail;


    return(
        <div>
            <img src={thumbnail} alt={name}/>
            <div > {name} </div>
            <div>{price}€</div>
            <div>{desc}</div>
            <button> Add to cart</button>
        </div>

    )
}