import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function delivery(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body;

    const date = new Date();
    date.setDate(24); // For debug
    date.setHours(0, 0, 0, 0);

    const date2 = new Date();
    date2.setDate(24); // For debug
    date2.setHours(23, 59, 59, 59);

    const packages = await prisma.package.findMany({
        where: {
            deliveryDate: {
                gte: date,
                lte: date2
            },
            deliveryManId: id,
        },
        include: {
            order: {
                include: {
                    buyer: true
                }
            }
        }
    });

    if (!packages[0]) res.status(200).json({packages: []});
    else {
        const graph = packages.map((pack, index) => {
            return {
                infos: {
                    firstName: pack.order.buyer.firstName,
                    lastName: pack.order.buyer.lastName,
                    address: pack.address,
                },
                id: index + 1,
                visited: false,
                distanceTo: Infinity,
                from: -1
            }
        });

        // On fait commencer le livreur du dépôt (fixé à CY Tech ici)
        graph.unshift({
            infos: {
                firstName: "Dépôt",
                lastName: "CYTech",
                address: "Avenue du Parc, 95000 Cergy"
            },
            id: 0,
            visited: false,
            distanceTo: 0,
            from: -1
        });

        graph.map(node => {
            
        })
        
        // res.status(200).json({packages: infos}) TODO
    }
}