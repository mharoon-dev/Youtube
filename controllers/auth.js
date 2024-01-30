import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { createError } from "../error.mjs";

export const signUpController = async (req, res, next) => {
  try {
    // generate password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // create a user
    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();

    res.status(200);
    res.json({
      status: 200,
      message: "Signup successful",
    });
  } catch (error) {
    next(error);
  }
};

export const logInController = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) next(createError(404, "User not found"));

    // Compare passwords

      const isCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) next(createError(400, "Wrong Credentials"));

      if (isCorrect) {
          // Generate and send token
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const {password , ...others} = user._doc
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({
            status: 200,
            message: "Login successful",
            data: others,
          });
      }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
