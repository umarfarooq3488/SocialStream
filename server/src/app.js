import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.COOKIE_ORIGIN,
    credentials: true,
}));
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ limit: "12kb", extended: true }));
app.use(cookieParser());

// Import routers
import userRouter from "./routes/User.routes.js";
import videoRouter from "./routes/Video.routes.js";
import tweetRouter from "./routes/Tweet.routes.js";
import commentRouter from "./routes/Comment.routes.js";
import likeRouter from "./routes/Like.routes.js";
import playlistRouter from "./routes/Playlist.routes.js";
import subscriptionRouter from "./routes/Subscription.routes.js";

// Use routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

export { app };