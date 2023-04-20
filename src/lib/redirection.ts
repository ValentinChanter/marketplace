import { User } from "@/pages/api/user";

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
        res.path = "/";
        res.desc = "";
        // TODO
        break;

      case "SELLER":
        res.path = "/";
        res.desc = "";
        // TODO
        break;
    }

    return res;
}