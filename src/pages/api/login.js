import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import prisma from "@/lib/prisma";

export default withIronSessionApiRoute(async (req, res) => {
  const { username, password } = await req.body;

  try {
    const userInfos = await prisma.user.findMany({
      where: {
        email: username,
        password
      },
    });

    if (!userInfos[0] || userInfos[1]) res.status(500).json({ message: "Adresse mail ou mot de passe invalide(s). Veuillez réessayer."});
    else {
      const userInfo = userInfos[0];
      const user = { id: userInfo.id, status: userInfo.status };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);