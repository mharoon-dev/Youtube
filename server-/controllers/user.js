import User from "../models/User.js";

export const updateUserController = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200);
      res.json({
        status: true,
        message: "User has been updated successfully!",
        data: updatedUser,
      });
    } else {
      res.status(403);
      res.json({
        status: false,
        message: "You can update only your account!",
      });
    }
  } catch (error) {
    next(
      res.status(500).json({
        status: false,
        message: error.message,
      })
    );
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200);
      res.json({
        status: true,
        message: "User has been deleted successfully!",
      });
    } else {
      res.status(403);
      res.json({
        status: false,
        message: "You can delete only your account!",
      });
    }
  } catch (error) {
    next(
      res.status(500).json({
        status: false,
        message: error.message,
      })
    );
  }
};

export const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean().exec();
    res.status(200);
    res.json({
      status: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

export const subscribeController = async (req, res, next) => {
  // try {
  //   const { id } = req.params;
  //   const user = await User.findById(id).lean().exec();
  //   res.status(200);
  //   res.json({
  //     status: true,
  //     message: "User fetched successfully",
  //     data: user,
  //   });
  // } catch (error) {
  //   res.status(500);
  //   res.json({
  //     status: false,
  //     message: error.message,
  //   });
  // }
};

export const unsubscribeController = async (req, res, next) => {};

export const likeController = async (req, res, next) => {};

export const dislikeController = async (req, res, next) => {};
