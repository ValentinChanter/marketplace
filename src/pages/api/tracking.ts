import { prisma } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    const pack = await prisma.package.findMany({
        where: {
            order: {
                buyerId: id,
            }
        }, 
        include: {
            order: {
            include: {
                products: true,
            },
            },
        },
    });
  
    res.status(200).json(pack);
  }