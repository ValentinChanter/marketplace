import { prisma } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   const productBySellerId = req.query.id?.toString();
   
   const product = await prisma.productBySeller.findUnique({
    where: { 
      id: productBySellerId 
    },
    include: {
      seller: true,
      product: true,
    },
   })

  
     if (!product) {
     return res.status(404).json({ message: 'Product not found' });
   }
  res.status(200).json(product);
}