import { useEffect, useState } from 'react';
import { ProductComp } from '../product/ProductComp';
import { Dropdown } from '../Dropdown';

// sorter which compare the delivery time or the price of products
export const Compare = ({ products }) => {
    const [sort, setSort] = useState('');
    const [delivery, setDelivery] = useState('');
    const [data, setData] = useState(products);
    
    useEffect(() => {
      let filteredProducts = products;
      if (delivery === 'Rapide'){        
        filteredProducts.sort((a:any, b:any) => a.seller.estDeliveryTime - b.seller.estDeliveryTime);
      } else if (delivery === 'Lent'){
        filteredProducts.sort((a:any, b:any) => b.seller.estDeliveryTime - a.seller.estDeliveryTime);
      }
      if (sort === 'croissant') {
        filteredProducts.sort((a:any, b:any) => a.price - b.price);
      } else if (sort === 'decroissant') {
        filteredProducts.sort((a:any, b:any) => b.price - a.price);
      }
      setData([...filteredProducts]);
    }, [delivery, sort, products]);
  
    const handleDropdown = (value:any) => {
      setSort(value);
    };
    const handleDelivery = (value:any) => {
      setDelivery(value);
    };
  
  
    return (
      <div>
        <div className="flex justify-start">
          <Dropdown isButton values={['Rapide', 'Lent']} onSelect={handleDelivery} >
            <button className="bg-mkOrange mx-1 px-2 py-1">
              Temps de livraison
            </button>
          </Dropdown>        
          <Dropdown isButton values={['croissant', 'decroissant']} onSelect={handleDropdown} >
            <button className="bg-mkOrange mx-1 px-2 py-1">
              Trier par prix
            </button>
          </Dropdown>
        </div>
        <div className="grid grid-cols-5  justify-evenly gap-5  pt-2">
          {data.map((product:any) => (
            <ProductComp key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };