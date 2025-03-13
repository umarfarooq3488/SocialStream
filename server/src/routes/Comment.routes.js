import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, deleteComment, getAllComments, updateComment } from "../controllers/comment.controller.js";

const router = Router();

// Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// Define routes for comment operations
router.route("/create").post(createComment);
router.route("/all/:videoId").get(getAllComments);
router.route("/update/:commentId").patch(updateComment);
router.route("/delete/:commentId").delete(deleteComment);

export default router;