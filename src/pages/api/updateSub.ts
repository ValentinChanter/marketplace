import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db';
import {User} from './user';

export default async function updateSub(req: NextApiRequest, res: NextApiResponse) {
    const { id, subscribed } = await req.body;
    
    console.log(id);
    try {
        const userInfos = await prisma.user.update({
        where: { id },
        data: { subscribed }
        });
    
        console.log(`Updated user with id ${id}. New subscribed status is ${subscribed}.`);
        const user = { id: userInfos.id, status: userInfos.status, isSubscribed: userInfos.subscribed, isLoggedIn: true } as User;
        res.status(200).json(user);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Failed to update user subscription status.' })
    }
}