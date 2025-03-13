import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addVideoToPlaylist, createPlaylist, deletePlaylist, getUserPlaylists, removeVideoFromPlaylist, updatePlaylist } from "../controllers/playlist.controller.js";

const router = Router();

// Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// Define routes for playlist operations
router.route("/create").post(createPlaylist);
router.route("/user-playlists").get(getUserPlaylists);
router.route("/add-video/:playlistId/:videoId").post(addVideoToPlaylist);
router.route("/remove-video/:playlistId/:videoId").post(removeVideoFromPlaylist);
router.route("/delete/:playlistId").delete(deletePlaylist);
router.route("/update/:playlistId").patch(updatePlaylist);

export default router;