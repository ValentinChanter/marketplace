import {FC} from 'react'
import Link from 'next/link';

export const ProductCat: FC<{product:any}> = ({product}) => {
    const name = product.product.name;
    const price = product.price;
    const thumbnail = product.product.imgUrl;
    
    return (
        <div className="bg-mkWhite shadow-md rounded-l-md w-full mt-2 mb-2 flex flex-col bg-clip-border p-4">
            <img src={thumbnail} alt={name} className="w-auto max-h-48 object-cover rounded-l-md" />
            <div className='flex justify-between'>
            <div className=" font-semibold">
                <Link href={{
                    pathname: 'product/[id]',
                    query:{
                        id: product.id
                    }
                }}>{name}</Link>
            
            </div>
            <div>
                <div className='text-mkDarkOrange font-bold'>
                     {price} € 
                </div>
            </div>
            </div>
        </div>
    )
}