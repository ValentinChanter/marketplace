import {FC} from 'react'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';


export const ProductCard: FC<{product:any}> = ({product}) => {
    const name = product.name;
    const desc = product.desc; 
    const price = product.price;
    const thumbnail = product.thumbnail;
    const material = product.material;
    const coptegory = product.category;
    return (
        <div className={styles.card}>
            <img src={thumbnail} alt={name} />
            <div>
                <Link href={{
                    pathname: 'product/[id]',
                    query:{
                        id: product.id
                    }
                }}>{name}</Link>
            
            </div>
            <div>
                <div>
                    {price}€
                </div>
            </div>
        </div>
    )
}