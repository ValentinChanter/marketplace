import { prisma } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   const queryPage = (req?.query?.page as string)
   // When a string have a "+" before it will transform attempt to transform into a number
   // like: 
   // let a = "69"
   // let n = +a -> 69 type number
   // when its cannot transform it will be a NaN
   // its like a Number("65") just faster to write and have some perfs advantage.
   const page = typeof +queryPage === "number" ? +queryPage : 0; // so we check if the page is a number, if not we have a default value

    
   const categories = await prisma.product.findMany({
    take: 30,
    skip: 30*page,
    select: {
        category: true
    },
    distinct: ['category']
   })

  return res.status(200).json(categories)
//      if (!product) {
//      return res.status(404).json({ message: 'Product not found' });
//    }
//   res.status(200).json(product);
}