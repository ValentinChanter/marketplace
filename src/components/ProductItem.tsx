import React from "react";
import {FC} from 'react'
import { useStateContext } from "../../context/StateContext";

export const ProductItem: FC<{product:any}> = ({product}) =>{
    const {qty, incQty, decQty, addToCart} = useStateContext();

    const name = product.product.name;
    const desc = product.product.desc; 
    const price = product.price;
    const thumbnail = product.product.thumbnail;
    const sellerName = product.seller.name;
    const stock = product.quantity;


    return(
        <div>
            <img src={thumbnail} alt={name}/>
            <div > {name}</div>
            <div>{price}€</div>
            <div> {sellerName} </div>
            <div>{desc}</div>
            <div>
                <p>Quantité :</p>
                <button onClick={decQty}>-</button>
                <span>{qty}</span>
                <button onClick={() => incQty(stock)}>+</button>
            </div>
            <button onClick={() => addToCart(product,qty)}> Add to cart</button>

        </div>

    )
}