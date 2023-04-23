import { FC, useEffect, useState } from "react";
import { ProductComp } from "../product/ProductComp";
import { Dropdown } from "../Dropdown";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const fetcher = ([url, params]) =>
  axios
    .get(url, {
      params: params,
    })
    .then((res: any) => res.data);

type SorterProps = {
  category: string;
};
/**
 * Category components
 * 
 * 
 */
const Category = ({ category }) => {
  const { data: categories, isLoading } = useSWR(
    ["/api/category", { page: 0 }],
    fetcher
  );
  const router = useRouter();
  if (isLoading) {
    return <>Is loading</>;
  }
  return (
    // {category: "Jeux"} -> "Jeux" -> <a href="/products?category">
    <div className="flex flex-col w-52 my-4 mr-4 border-r-4 border-solid border-r-mkDarkGreen">
      <h1 className="px-2 text-xl font-medium py-2 underline decoration-mkDarkGreen">
        Categories
      </h1>
      {categories
        .map((cat) => cat.category)
        .map((cat, i) => {
          return (
            <Link
              key={i}
              href={{
                pathname: "/products",
                query: {
                  ...router.query,
                  category: cat,
                },
              }}
            >
              <div className="pl-4">
              {category === cat ? (
                  <span className="font-bold text-mkDarkGreen ">
                    {cat}
                  </span>
                ) : (
                  <span>{cat}</span>
                )}
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export const Sorter: FC<SorterProps> = ({ category, search }) => {
  // have a route for category list
  // have a router can filter product by category&price&other
  // search: search, category:category

  const [sort, setSort] = useState("");
  const [data, setData] = useState([]);

  const { data: products, isLoading } = useSWR(
    ["/api/search", { p: 0, q: search, c: category, s:"enta" }],
    fetcher
  );


  useEffect(() => {
    setData(products)
  }, [products])

  useEffect(() => {
    if (sort === 'croissant') {
      setData([...data.sort((a, b) => a.price - b.price)])      
    } 
    if (sort === 'decroissant') {
      setData([...data.sort((a, b) => b.price - a.price)])
    }
  }, [sort])
  

  const handleDropdown = (value) => {
    setSort(value);
  };

  const handleCategory = (value) => {
    // setCategory(value);
  };

  return (
    <div className="w-full my-4">
      <div className="flex justify-start w-full">
        <Category category={category} />
        <div className="w-full">
          <Dropdown
            isButton
            values={["croissant", "decroissant"]}
            onSelect={handleDropdown}
          >
            <button className="bg-mkOrange mx-1 px-2 py-1">
              Trier par prix
            </button>
          </Dropdown>
          <div className="grid grid-cols-5 justify-evenly gap-4 w-full pt-2 px-2">
            {data &&
              data.map((product) => (
                <ProductComp key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
