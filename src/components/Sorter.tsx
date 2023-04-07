import {useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import {Dropdown} from './Dropdown'

export const Sorter = ({products}) => {
    const [sort, setSort] = useState("")
    const[data, setData] = useState(products)

    useEffect(() => {
        if (sort === "croissant"){
            setData(() => [...products.sort((a,b) => a.price - b.price)])
        }

        if (sort === "decroissant"){
            setData(() => [...products.sort((a,b) => b.price - a.price)])
        }
    })

    const handleDropdown = (value:string) => {
        setSort(value)
    }
    return(
        <div>
            <div>
                <Dropdown isButton values={['croissant','decroissant']} onSelect={handleDropdown}>
                    <button> filtrer </button>
                </Dropdown>
            </div>
            <div>
                {data.map((product:any) =>(
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )

}