import { prisma } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const productData = req.body;

  const test = await prisma.product.create({
    data: {
      name: productData.name,
      desc: productData.desc,
      imgUrl: "Monke",
      category: productData.category,
    },
  });

  const test2 = await prisma.productBySeller.create({
    data: {
      productId: test.id,
      sellerId: "clgnrp51700026e9lc0p9xkw7",
      quantity: productData.quantity,
      price: productData.price,
    },
  });
  console.log(test2);
  res.status(200).json(productData);
}