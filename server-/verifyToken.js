import jwt from "jsonwebtoken";
import { createError } from "./error.mjs";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return (createError(401 , "You are not authenticated!"));

    jwt.verify(token , process.env.jwt , (err, user) => {
        if (err) return (createError(403 , "Token is not valid!"));
        req.user = user;
        console.log(req.user);
        console.log(user);
        next()
    })

}