import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./utils/config.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import videoRouter from "./routes/video.js";
import commentsRouter from "./routes/comment.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
dbConnection();

// apis
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/videos", videoRouter);
// app.use("/api/v1/comments", commentsRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
