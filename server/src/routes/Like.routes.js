import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router();

// Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// Define routes for like operations
router.route("/video-like/:videoId").post(toggleVideoLike);
router.route("/tweet-like/:tweetId").post(toggleTweetLike);
router.route("/comment-like/:commentId").post(toggleCommentLike);
router.route("/liked-videos").get(getLikedVideos);

export default router;