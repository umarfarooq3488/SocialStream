import asyncHandler from "../utils/asyncHandler.js"
import { Video } from "../models/Video.model.js"
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadFileOnCloudinary } from "../utils/Cloudinary.js";

const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description, duration } = req.body;

    console.log("body data", req.body)
    console.log("Files", req.files);
    if (!req.files?.videoFile?.[0] || !req.files?.thumbnail?.[0]) {
        throw new ApiError(400, "Video and thumbnail are required");
    }

    // Upload both files concurrently
    const [videoResult, thumbnailResult] = await Promise.all([
        uploadFileOnCloudinary(req.files.videoFile[0].buffer, "video"),
        uploadFileOnCloudinary(req.files.thumbnail[0].buffer, "image")
    ]);

    if (!videoResult || !thumbnailResult) {
        throw new ApiError(500, "Error uploading files to cloud");
    }

    const video = await Video.create({
        title,
        description,
        duration,
        videoFile: videoResult.secure_url,
        thumbnail: thumbnailResult.secure_url,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, video, "Video uploaded successfully")
    );
})

const getVideoDetails = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(401, "video id is not available")
    }
    const video = await Video.findById(videoId).populate("owner", "userName fullName avatar");
    if (!video) {
        throw new ApiError(401, "Couldn't fetch the video with the given id")
    }

    video.views += 1;
    await video.save()

    res.status(200).json(
        new ApiResponse(200, video, "Video details are fetched successfully")
    )
})

const updateVideoDetails = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(401, "video id is not available")
    }
    const { title, description, duration } = req.body;
    if ([title, description, duration].some(field => field.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }


    const video = await Video.findByIdAndUpdate(videoId, {
        $set: {
            title,
            description,
            duration
        }
    }, {
        new: true
    });
    if (!video) {
        throw new ApiError(400, "video Id is not valid")
    }
    res.status(200).json(
        new ApiResponse(200, video, "Video details are updated successfully")
    )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(401, "videoId is not provided")
    }
    const deletedVideo = await Video.findByIdAndDelete(videoId)
    if (!deletedVideo) {
        throw new ApiError(401, "Couldn't find the video with given id")
    }

    res.status(200).json(
        new ApiResponse(200, deletedVideo, "Video deleted successfully")
    )
})

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        populate: { path: "owner", select: "userName fullName avatar" }
    }
    const allVideos = await Video.paginate({}, options)
    if (!allVideos) {
        throw new ApiError(401, "There is a problem while fetching the videos")
    }

    res.status(200, allVideos, "All videos fetched successfully")
})

const searchVideos = asyncHandler(async (req, res) => {
    const { query, page = 1, limit = 1, sortBy, sortType, userId } = req.query;
    const filter = {}
    if (!query) {
        throw new ApiError(401, "Search query is not provided")
    } else {
        filter.title = query
    }
    if (userId) {
        filter.owner = userId
    }

    const sortOptions = {}
    if (sortBy) {
        sortOptions[sortBy] = sortType === "desc" ? -1 : 1;
    }


    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: sortOptions,
        populate: { path: "owner", select: "fullName userName avatar" }
    }

    const videos = await Video.paginate(filter, options)
    if (!videos) {
        throw new ApiError(400, "No videos matched")
    }
    res.status(200).json(
        new ApiResponse(200, videos, "Query matched")
    )
})

const togglePublishVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findByIdAndUpdate(videoId,
        [
            {
                $set: {
                    isPublished: { $not: "$isPublished" }
                }
            }
        ], {
        new: true
    }
    )

    res.status(200).json(
        new ApiResponse(200, video, "Video status is changed successfully")
    )
})



export {
    uploadVideo,
    getVideoDetails,
    updateVideoDetails,
    deleteVideo,
    getAllVideos,
    searchVideos,
    togglePublishVideo
}