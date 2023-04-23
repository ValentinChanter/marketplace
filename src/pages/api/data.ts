import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/db';
import { raw } from '@prisma/client/runtime';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // try{
    //   const products = await prisma.productBySeller.findMany({
    //     include: {
    //       seller: true,
    //       product: true,
    //     }
    //   });
    //   res.status(200).json(products);
    // }catch(e) {
    //   res.status(200).json([])
    // }
    const products = await prisma.productBySeller.findMany({
      include: {
        seller: true,
        product: true,
      }
    });
    res.status(200).json(products);
}