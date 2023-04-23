import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "./user";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

// Détruit la session actuelle et renvoie une session nulle (sans aucune propriété)
async function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	req.session.destroy();
	res.json({ id: "", name: "", status: null, isSubscribed: false, isLoggedIn: false });
}