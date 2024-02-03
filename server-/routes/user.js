import express from "express";
import {
  deleteUserController,
  dislikeController,
  getUserController,
  likeController,
  subscribeController,
  unsubscribeController,
  updateUserController,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const userRouter = express.Router();

// update a user
// put api
// /api/v1/users/:id
userRouter.put("/:id", verifyToken, updateUserController);

// delete a user
// delete api
// /api/v1/users/:id
userRouter.delete("/:id", verifyToken, deleteUserController);

// get a user
userRouter.get("/find/:id", getUserController);

// subscribe a user
// put api
// /api/v1/users/sub/:id
userRouter.put("/sub/:id", verifyToken, subscribeController);

// unsubscribe a user
// put api
// /api/v1/users/unsub/:id
userRouter.put("/unsub/:id", verifyToken, unsubscribeController);

// like a video
userRouter.put("/like/:videoId", verifyToken, likeController);

// dislike a video
userRouter.put("/dislike/:videoId", verifyToken, dislikeController);

export default userRouter;
