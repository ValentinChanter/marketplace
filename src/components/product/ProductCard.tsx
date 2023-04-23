import {FC} from 'react'
import Link from 'next/link';


export const ProductCard: FC<{product:any}> = ({product}) => {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    //let z =  {a:"b"}
    //z.a -> b
    // z.b -> error
    // z['b'] -> undefined
    // z?.b // b not exist so undefined, stop the exec
    // z?.b?.a // if b not exist will stop search more and not evaluate "?.a"    
    const name = product?.product?.name ?? product.name;
    const price = product.price;
    const sellerfirstName = product?.seller?.firstName ?? product.firstName;
    const sellerName = product?.seller?.lastName ?? product.lastName;
    const thumbnail = product?.product?.imgUrl ?? product.imgUrl;

    return (
        <div className="bg-white shadow-md rounded-lg text-gray-800 mt-2 mb-2 flex flex-col bg-clip-border">
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
                <div> {sellerfirstName} {sellerName}</div>

                <button> Add to cart</button>
            </div>
        </div>
    )
}