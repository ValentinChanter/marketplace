import { useEffect, useState } from 'react';
import { ProductCat } from '../product/ProductCat';
import Link from 'next/link';

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
    <div>
      <h2>{category}</h2>
      <div className="flex flex-wrap justify-evenly gap-4 f-full pt-2">
        <div className='bg-mkGreen p-5 rounded px-2'>
          <Link href={{
            pathname: '/products/',
            query: {category: category}
          }}>Voir plus</Link>
        </div>
        {data.map((product) => (
          <ProductCat key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
    