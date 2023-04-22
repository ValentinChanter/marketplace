import {FC} from 'react'
import Link from 'next/link';
import { useStateContext } from '../../context/StateContext';

export const ProductCard: FC<{product:any}> = ({product}) => {
    const {addToCart} = useStateContext();

    const name = product.product.name;
    const price = product.price;
    const sellerName = product.seller.name;
    const thumbnail = product.product.thumbnail;
    
    return (
        <div className="bg-white shadow-md rounded-lg max-w-md w-3/12 text-gray-800 mt-2 mb-2 flex flex-col bg-clip-border">
            <img src={thumbnail} alt={name} className="w-auto max-h-48 object-cover rounded-lg" />
            <div className="font-medium text-center">
                <Link href={{
                    pathname: 'product/[id]',
                    query:{
                        id: product.id
                    }
                }}>{name}</Link>
            
            </div>
            <div>
                <div>
                     {price} € 
                </div>
                <div> {sellerName} </div>

                <button onClick={() => addToCart(product, 1)}> Add to cart</button>
            </div>
        </div>
    )
}