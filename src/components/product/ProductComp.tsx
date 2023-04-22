import React from "react";
import {FC} from 'react'

export const ProductComp: FC<{product:any}> = ({product}) =>{
    const name = product.product.name;
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
        </div>

    )
}