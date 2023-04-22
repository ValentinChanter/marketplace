import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { Status } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  status: Status | null;
  isSubscribed: boolean;
  isLoggedIn: boolean;
}

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      id: "",
      name: "",
      status: null,
      isSubscribed: false,
      isLoggedIn: false
    });
  }
}