import express from "express";
import { logInController, signUpController } from "../controllers/auth.js";

const authRouter = express.Router();

// create a user
// post api
// /api/v1/auth/signup
authRouter.post("/signup", signUpController )
// signin
authRouter.post("/login",logInController )
// google auth
// authRouter.post("/google", )

export default authRouter