import { useEffect, useState } from 'react';
import { ProductComp } from '../product/ProductComp';
import { Dropdown } from '../Dropdown';

export const Compare = ({ products }) => {
    const [sort, setSort] = useState('');
    const [delivery, setDelivery] = useState('');
    const [data, setData] = useState(products);
  
    useEffect(() => {
      let filteredProducts = products;
      // products type: array
      // map,sort,
      // delivry <---
      if (delivery === 'Rapide'){
        filteredProducts.sort((a, b) => a.seller.estDeliveryTime - b.seller.estDeliveryTime);
      } else if (delivery === 'Lent'){
        filteredProducts.sort((a, b) => b.seller.estDeliveryTime - a.seller.estDeliveryTime);
      }
      if (sort === 'croissant') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'decroissant') {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
      setData([...filteredProducts]);
    }, [delivery, sort, products]);
  
    const handleDropdown = (value) => {
      setSort(value);
    };
    const handleDelivery = (value) => {
      setDelivery(value);
    };
  
  
    return (
      <div>
        <div className="flex justify-start">
          <Dropdown isButton values={['Rapide', 'Lent']} onSelect={handleDelivery} >
            <button className="bg-stone-300 mx-1 px-2 py-1">
              Temps de livraison
            </button>
          </Dropdown>        
          <Dropdown isButton values={['croissant', 'decroissant']} onSelect={handleDropdown} >
            <button className="bg-stone-300 mx-1 px-2 py-1">
              Trier par prix
            </button>
          </Dropdown>
        </div>
        <div className="flex flex-wrap justify-evenly gap-4 f-full pt-2">
          {data.map((product) => (
            <ProductComp key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };