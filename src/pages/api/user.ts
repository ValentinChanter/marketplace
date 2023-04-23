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

// Renvoie les informations de l'utilisateur si trouvé, un utilisateur nul sinon
async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
	if (req.session.user) {
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