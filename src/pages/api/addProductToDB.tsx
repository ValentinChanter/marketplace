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
      imgUrl: productData.imgUrl,
      category: productData.category,
    },
  });

  const test2 = await prisma.productBySeller.create({
    data: {
      productId: test.id,
      sellerId: productData.userId,
      quantity: productData.quantity,
      price: productData.price,
    },
  });

  console.log(productData);
  res.status(200).json(productData);
}
