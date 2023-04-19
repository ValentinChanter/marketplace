import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  const products = await prisma.productBySeller.findMany({
    include: {
      seller: true,
      product: true,
    },
  });
  res.status(200).json(products);
}