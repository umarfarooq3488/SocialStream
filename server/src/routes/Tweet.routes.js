import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getUserTweets, searchTweets, updateTweet } from "../controllers/tweet.controller.js";

const router = Router();

// Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// Define routes for tweet operations
router.route("/create").post(createTweet);
router.route("/user-tweets").get(getUserTweets);
router.route("/update/:tweetId").patch(updateTweet);
router.route("/delete/:tweetId").delete(deleteTweet);
router.route("/search").get(searchTweets);

export default router;