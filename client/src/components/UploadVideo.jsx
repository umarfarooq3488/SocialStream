import React, { useState, useRef } from "react";
import { uploadVideo } from "../api/VideoApi";
import toast, { Toaster } from "react-hot-toast";

const UploadVideoComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  });

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    setVideoFile(file);

    // Create video preview URL
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);

    // Optional: Auto-detect video duration
    // const video = document.createElement("video");
    // video.onloadedmetadata = () => {
    //   const minutes = Math.floor(video.duration / 60);
    //   const seconds = Math.floor(video.duration % 60);
    //   setFormData((prev) => ({
    //     ...prev,
    //     duration: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
    //   }));
    // };
    // video.src = videoURL;
  };

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !thumbnailFile) {
      toast.error("Please select both a video file and thumbnail");
      return;
    }
    setIsUploading(true);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    const uploadData = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      thumbnail: thumbnailFile, // File object
      videoFile: videoFile, // File object
    };

    try {
      const video = await uploadVideo(uploadData);
      toast.success("Video uploaded successfully");
      setUploadProgress(100);
      clearInterval(interval);

      // Reset form
      setTimeout(() => {
        setFormData({ title: "", description: "", duration: "" });
        setVideoFile(null);
        setThumbnailFile(null);
        setVideoPreview(null);
        setThumbnailPreview(null);
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error(error.message || "Error uploading video");
      setIsUploading(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <Toaster />
      <h2 className="text-2xl font-bold text-center mb-6">Upload New Video</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - File uploads */}
          <div className="space-y-6">
            {/* Video Upload */}
            <div>
              <p className="font-medium mb-2 text-gray-700">Video File</p>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition"
                onClick={() => videoInputRef.current?.click()}
              >
                {videoPreview ? (
                  <div className="relative">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full h-48 object-cover rounded"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      {videoFile?.name} (
                      {(videoFile?.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  </div>
                ) : (
                  <div className="py-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 4v16M17 4v16M3 8h18M3 16h18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l-5-5-5 5M17 16l-5 5-5-5"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">
                      Click to select video file
                    </p>
                    <p className="text-xs text-gray-400">
                      MP4, AVI, MOV, or MKV
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={handleVideoSelect}
                  accept="video/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <p className="font-medium mb-2 text-gray-700">Thumbnail Image</p>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                {thumbnailPreview ? (
                  <div className="">
                    <img
                      src={thumbnailPreview}
                      alt="Video thumbnail"
                      className="w-full h-48 object-cover rounded"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      {thumbnailFile?.name} (
                      {(thumbnailFile?.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  </div>
                ) : (
                  <div className="py-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">
                      Click to select thumbnail image
                    </p>
                    <p className="text-xs text-gray-400">JPG, PNG, or WEBP</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailSelect}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Right column - Text inputs */}
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter video title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter video description"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Duration Input */}
            <div>
              <label
                htmlFor="duration"
                className="block font-medium text-gray-700 mb-1"
              >
                Duration (MM:SS)
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g. 05:30"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Auto-detected from video file when possible
              </p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-blue-600">
                Uploading...
              </span>
              <span className="text-sm font-medium text-blue-600">
                {uploadProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className={`px-8 py-3 rounded-md text-white font-medium ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideoComponent;
