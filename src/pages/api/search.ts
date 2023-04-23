import { prisma } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = req.query.q?.toString();
  const s = req.query.s?.toString(); // seller, random word to active it 
  const c = req.query.c?.toString(); // category
  const p = req.query.p?.toString(); // page
 

  const page = typeof +(p as string) === "number" ? +(p as string) : 0;

  if (!q && !c) {
    return res.status(200).json([]);
  }
  if (s) {
    const products = await prisma.productBySeller.findMany({
      where: {
        product: {
          name: {
            contains: q,
            mode: "insensitive",
          },
          category: c? {
            contains:c,
            mode:'insensitive'
          } : undefined
        },
      },
      include: {
        seller: true,
        product: true,
      },
      take: 10
    });
    res.status(200).json(products);
  } else {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 10
    });
    res.status(200).json(products);
  }



  // if (!products) {
  //     return res.status(404).json({ message: 'Product not found' });
  // }
//   res.status(200).json(products);
}
