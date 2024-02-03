import { createError } from "../error.mjs";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideoController = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    const savedVideo = await newVideo.save();
    res.status(200);
    res.json({
      status: true,
      message: "Video has been added successfully!",
      data: savedVideo,
    });
  } catch (error) {
    next(err);
  }
};
export const updateVideoController = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      const errorObj = {
        status: false,
        message: "Video not found",
      };
      return createError(404, errorObj);
    }

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200);
      res.json({
        status: true,
        message: "Video has been updated successfully!",
        data: updatedVideo,
      });
    } else {
      const errorObj = {
        status: false,
        message: "You can only update your videos!",
      };
      next(createError(403, errorObj));
    }
  } catch (error) {
    next(error);
  }
};
export const deleteVideoController = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      const errorObj = {
        status: false,
        message: "Video not found",
      };
      return createError(404, errorObj);
    }

    if (req.user.id === video.userId) {
      const deletedVideo = await Video.findByIdAndDelete(req.params.id);
      res.status(200);
      res.json({
        status: true,
        message: "Video has been deleted successfully!",
      });
    } else {
      const errorObj = {
        status: false,
        message: "You can only delete your videos!",
      };
    }
  } catch (error) {
    next(error);
  }
};
export const getVideoController = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      const errorObj = {
        status: false,
        message: "Video not found",
      };
      next(createError(404, errorObj));
    } else {
      res.status(200);
      res.json({
        status: true,
        message: "Video fetched successfully!",
        data: video,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const videoViewsController = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200);
    res.json({
      status: true,
      message: "Views has been updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};
export const trendVideoController = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200);
    res.json({
      status: true,
      message: "Trended Videos fetched successfully!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};
export const randomVideoController = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200);
    res.json({
      status: true,
      message: "Video fetched successfully!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};
export const subController = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
            return await Video.find({ userId: channelId });
        })
    )

    res.status(200)
    res.json({
        status: true,
        message: "Subscribed channels fetched successfully!",
    })
};
