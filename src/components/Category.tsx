import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCat } from './product/ProductCat';

export const Category = ({ products, category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter((product) => product.product.category === category);
    }
    setData([...filteredProducts]);
  }, [category, products]); 

  return (
    <div className='w-full'>
      <div className='font-semibold text-mkDarkBlue text-xl'>
        <h1>{category}</h1>
      </div>
      <div className='flex flex-row w-full'>
      <div className="grid grid-cols-4 w-full justify-evenly gap-7 pt-2">
        
        {data.sort(() => Math.random() - 0.5).slice(0, 4).map((product) => (
          <ProductCat key={product.id} product={product} />
        ))}        
      </div>
      <div className='w-10 self-center'>
          <Link href={{
            pathname: '/products/',
            query: {category: category}
          }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              className='stroke-mkDarkGreen'
              width="3em" 
              height="3em" 
              viewBox="0 0 32 32">
                <path 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="m12 30l12-14L12 2">
                </path>
              </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
    