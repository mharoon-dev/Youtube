import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addVideoController,
  deleteVideoController,
  getVideoController,
  randomVideoController,
  subController,
  trendVideoController,
  updateVideoController,
  videoViewsController,
} from "../controllers/video.js";
const videoRouter = express.Router();

// create a video
// post api
// /api/v1/videos
videoRouter.post("/", verifyToken, addVideoController);

// update a video
// put api
// /api/v1/videos/:id
videoRouter.put("/:id", verifyToken, updateVideoController);

// delete a video
// delete api
// /api/v1/videos/:id
videoRouter.delete("/:id", verifyToken, deleteVideoController);

// get a video
// get api
// /api/v1/videos/find/:id
videoRouter.get("/find/:id", getVideoController);

// views of video
// put api
// /api/v1/videos/views/:id
videoRouter.put("/views/:id", videoViewsController);

// trend of video
// get api
// /api/v1/videos/trend
videoRouter.get("/trend", trendVideoController);

// random of video
// get api
// /api/v1/videos/random
videoRouter.get("/random", randomVideoController);

// subscribe channel videos
// get api
// /api/v1/videos/sub
videoRouter.get("/sub", verifyToken, subController);

export default videoRouter;
