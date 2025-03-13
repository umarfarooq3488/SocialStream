import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getChannelSubscribers, getSubscribedChannels, toggleSubscribe } from "../controllers/subscription.controller.js";

const router = Router();

// Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// Define routes for subscription operations
router.route("/toggle-subscribe/:channelId").post(toggleSubscribe);
router.route("/subscribed-channels").get(getSubscribedChannels);
router.route("/channel-subscribers/:channelId").get(getChannelSubscribers);
export default router;