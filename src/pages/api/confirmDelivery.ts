import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

// Met à jour la bdd pour confirmer la bonne livraison d'un package
export default async function confirmDelivery(req: NextApiRequest, res: NextApiResponse) {
    const { id } = await req.body;

    const pack = await prisma.package.update({
        where: {
            id
        },
        data: {
            delivered: true
        }
    });

    if (pack) res.status(200).json({isDelivered: pack.delivered});
    else res.status(500);
}