import { useEffect, useState, FC} from "react";
import Link from "next/link";
import { ProductCat } from "./product/ProductCat";
import useSWR from "swr";
import axios from "axios";

const fetcher = ([url, params]) =>
  axios
    .get(url, {
      params: params,
    })
    .then((res: any) => res.data);

export const Category: FC<{category?:string, loading?: boolean}> = ({ category, loading }) => {
  // const [data, setData] = useState([]);
  if (loading) {
    return (
      <>
        <div className="w-full">
          <div className="font-semibold text-mkDarkBlue text-xl">
            <h1 className="h-6 bg-mkDarkBlue/50 w-24 rounded"></h1>
          </div>
          <div className="flex flex-row w-full">
            <div className="grid grid-cols-4 w-full justify-evenly gap-7 pt-2">
              <ProductCat loading={true} />
              <ProductCat loading={true} />
              <ProductCat loading={true} />
              <ProductCat loading={true} />
            </div>
            <div className="w-10 self-center">
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-mkDarkGreen"
                  width="3em"
                  height="3em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m12 30l12-14L12 2"
                  ></path>
                </svg>
            </div>
          </div>
        </div>
      </>
    );
  }

  const { data: products, isLoading } = useSWR(
    ["/api/search", { p: 0, c: category, s: "enta" }],
    fetcher
  );



  return (
    <div className="w-full">
      <div className="font-semibold text-mkDarkBlue text-xl">
        <h1>{category}</h1>
      </div>
      <div className="flex flex-row w-full">
        <div className="grid grid-cols-4 w-full justify-evenly gap-7 pt-2">
          {products && products
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((product) => (
              <ProductCat key={product.id} product={product} />
            ))}
        </div>
        <div className="w-10 self-center">
          <Link
            href={{
              pathname: "/products/",
              query: { category: category },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-mkDarkGreen"
              width="3em"
              height="3em"
              viewBox="0 0 32 32"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m12 30l12-14L12 2"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
