// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

import { User } from "@/pages/api/user";

 // This is where we specify the typings of req.session.* 
declare module "iron-session" { 
  interface IronSessionData { 
    user?: User; 
  } 
} 

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || "",
  cookieName: "iron-session/examples/next.js",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",

    
  },
};