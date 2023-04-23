import { User } from "@/pages/api/user";

// Renvoie le path et la description du path pour avoir un navbar dynamique
export default function redirection(user: User) {
		var res = {path: "/", desc: ""};
		if (!user) return res;

		switch(user?.status) {
			case "CLIENT":
				res.path = "/orders";
				res.desc = "Mes commandes";
				break;

			case "DELIVERY":
				res.path = "/delivery";
				res.desc = "Mes livraisons";
				break;

			case "MARKETPLACE":
				res.path = "/addProduct";
				res.desc = "Ajouter un produit";
				break;

			case "SELLER":
				res.path = "/addProduct";
				res.desc = "Ajouter un produit";
				break;
		}

		return res;
}