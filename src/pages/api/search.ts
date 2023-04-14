import { prisma } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const q = req.query.q?.toString();

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: q,
                mode: 'insensitive'
            }
        }
    });
  
    if (!products) {
        return res.status(404).json({ message: 'Product not found' });
    }
  res.status(200).json(products);
}