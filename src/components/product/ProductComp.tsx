import React from "react";
import {FC} from 'react'
import { useStateContext } from "../../context/StateContext";

export const ProductItem: FC<{product:any}> = ({product}) =>{
    const {qty, incQty, decQty, addToCart} = useStateContext();

    const name = product.product.name;
    const price = product.price;
    const sellerfirstName = product.seller.firstName;
    const sellerName = product.seller.lastName;
    const thumbnail = product.product.thumbnail;
    const stock = product.quantity;
    const delivery = product.seller.estDeliveryTime



    return(
        <div>
            <img src={thumbnail} alt={name}/>
            <div > {name}</div>
            <div>{price}€</div>
            <div>{desc}</div>
            <div>
                <p>Quantité :</p>
                <button onClick={decQty}>-</button>
                <span>{qty}</span>
                <button onClick={() => incQty(stock)}>+</button>
            </div>
            <button onClick={() => addToCart(product,qty)}> Add to cart</button>

            <div> {sellerfirstName} {sellerName} </div>
            <div> livraison estimée : {delivery} jours</div>
        </div>

    )
}