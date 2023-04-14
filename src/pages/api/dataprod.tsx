import { prisma } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   const productId = req.query.id?.toString();
   const product = await prisma.product.findUnique({ where: { id: productId } });
//   const product = await prisma.product.findMany();
  
     if (!product) {
     return res.status(404).json({ message: 'Product not found' });
   }
  res.status(200).json(product);
}