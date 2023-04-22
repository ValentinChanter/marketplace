import { prisma } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // get, post, put, delete
   const productId = req.query.id?.toString();
   const product = await prisma.productBySeller.findMany({ 
    where: { 
      productId: productId
    },
    include: {
      seller: true,
      product: true,
    },
   });

  
     if (!product) {
     return res.status(404).json({ message: 'Products not found' });
   }
  res.status(200).json(product);
}