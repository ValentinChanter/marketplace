import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

async function signup(req: NextApiRequest, res: NextApiResponse) {
    const { firstName, lastName, email, password } = await req.body;

    const userInfos = await prisma.user.findUnique({
        where: { email }
    })

    if (userInfos) res.status(409).json({ message: "Cet utilisateur existe déjà. Veuillez réessayer avec une adresse mail différente."});
    else {
        const hash = await bcrypt.hash(password, 10);

        try {
            prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hash
                },
            }).then(() => res.status(200).json({ ok: true }));
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default signup;