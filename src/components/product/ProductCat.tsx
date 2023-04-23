import { FC } from "react";
import Link from "next/link";
import { ImageWithFallback } from "../ImageWithFallback";

export const ProductCat: FC<{ product?: any; loading?: boolean }> = ({
  product,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-mkWhite shadow-md rounded-sm w-full mt-2 mb-2 flex flex-col bg-clip-border p-4 animate-pulse">
        <div className="w-auto h-52 max-h-48 object-cover rounded-sm bg-mkDarkBlue/50"></div>
        <div className="flex my-1 justify-between">
          <div className="h-4 bg-mkDarkBlue/50 w-24 rounded"></div>
          <div className="h-4 bg-mkDarkBlue/50 w-12 rounded"></div>
        </div>
      </div>
    );
  }
  const name = product.product.name;
  const price = product.price;
  const thumbnail = product.product.imgUrl;

  return (
    <div className="bg-mkWhite shadow-md rounded-sm w-full mt-2 mb-2 flex flex-col bg-clip-border p-4">
      <ImageWithFallback
        width={400}
        height={400}
        src={thumbnail}
        alt={name}
        className="w-auto max-h-48 object-cover rounded-sm"
      />
      <div className="flex justify-between">
        <div className=" font-semibold">
          <Link
            href={{
              pathname: "product/[id]",
              query: {
                id: product.id,
              },
            }}
          >
            {name}
          </Link>
        </div>
        <div>
          <div className="text-mkDarkOrange font-bold">{price} €</div>
        </div>
      </div>
    </div>
  );
};
