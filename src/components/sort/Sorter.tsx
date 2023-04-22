import { useEffect, useState } from 'react';
import { ProductCard } from '../product/ProductCard';
import { Dropdown } from '../Dropdown';
import useSWR from 'swr'
import axios from 'axios';

const fetcher = ([url,params]) => axios.get(url, {
  params: params,
}).then((res:any) => res.data);


export const Sorter = ({ }) => {
  // have a route for category list
  // have a router can filter product by category&price&other
  // 

  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);

  const {data: categories} = useSWR(['/api/category', {page:1}], fetcher)
  console.log(data);
  
  // useEffect(() => {
  //   let filteredProducts = products;
  //   if (category) {
  //     filteredProducts = products.filter((product) => product.product.category === category);
  //   }
  //   if (sort === 'croissant') {
  //     filteredProducts.sort((a, b) => a.price - b.price);
  //   } else if (sort === 'decroissant') {
  //     filteredProducts.sort((a, b) => b.price - a.price);
  //   }
  //   setData([...filteredProducts]);
  // }, [category, sort, products]);

  const handleDropdown = (value) => {
    setSort(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  
  return (
    <div>
      <div className="flex justify-start">
        <Dropdown isButton values={['Jeux', 'High-tech']} onSelect={handleCategory} >
          <button className="bg-stone-300 mx-1 px-2 py-1">
            Catégorie
          </button>
        </Dropdown>        
        <Dropdown isButton values={['croissant', 'decroissant']} onSelect={handleDropdown} >
          <button className="bg-stone-300 mx-1 px-2 py-1">
            Trier par prix
          </button>
        </Dropdown>
      </div>
      <div className="flex flex-wrap justify-evenly gap-4 f-full pt-2">
        {/* {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
      </div>
    </div>
  );
};
