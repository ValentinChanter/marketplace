import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user";
const bcrypt = require("bcryptjs");

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = await req.body;

  try {
    const userInfos = await prisma.user.findUnique({
      where: {
        email
      },
    });

    const isPasswordValid = userInfos ? await bcrypt.compare(password, userInfos.password) as boolean : false

    if (!userInfos || !isPasswordValid) res.status(401).json({ message: "Adresse mail ou mot de passe invalide(s). Veuillez réessayer."});
    else {
      const user = { id: userInfos.id, status: userInfos.status, isSubscribed: userInfos.subscribed, isLoggedIn: true } as User;
      req.session.user = user;
      await req.session.save();
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}, sessionOptions);