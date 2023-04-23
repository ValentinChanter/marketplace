import { prisma } from '@/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { address, postalCode, city, price, buyerId, deliveryManId, orderItems} = await req.body;
    const fullAddress = address + ", " + postalCode + " " + city;

    // Récupérer les dates de livraison dans le bon format
    const now = new Date();
    const datetime = now.toISOString();
    const later = new Date(now.getTime() + (4 * 24 * 60 * 60 * 1000));
    const deliveryDate = later.toISOString();

    if (orderItems.length === 0) {
        res.status(400).json({ message: "Order items cannot be empty" });
        return;
      }

    // Création de la commande
    const order = await prisma.order.create({
        data: {
            price: price,
            orderDate: datetime,
            paid: true,
            buyerId: buyerId,
            products: {
                connect: orderItems.map((item: { id: any; }) => ({ id: item.id })),
            }
        }
    })

    // Création du colis correspondant
    const pack = await prisma.package.create({
        data: {
            address: fullAddress,
            deliveryDate: deliveryDate,
            deliveryManId: deliveryManId,
            orderId: order.id,
        }
    })

    if(order && pack) {
        res.status(200).json({ message: "Order and package created successfully" });
    } else {
        res.status(500).json({ message: "Failed to create order and package" });
    }
}
