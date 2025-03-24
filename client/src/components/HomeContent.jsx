// HomeContent.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Filter,
  Clock,
} from "lucide-react";
import Video from "./Video";
import { useVideo } from "../context/VideosContext";
import { retrieveVideos } from "../api/VideoApi";
import toast, { Toaster } from "react-hot-toast";

const HomeContent = () => {
  const { state, dispatch } = useVideo();

  useEffect(() => {
    const getVideos = async () => {
      const toastID = toast.loading("Loading");
      try {
        dispatch({ type: "VIDEOS_REQUEST" });
        const response = await retrieveVideos();
        if (response) {
          dispatch({ type: "VIDEOS_SUCCESS", payload: response });
        }
        toast.dismiss(toastID);
      } catch (error) {
        console.log("Error occurred while fetching videos!", error);
        dispatch({ type: "VIDEOS_ERROR", payload: error });
      } finally {
        toast.dismiss(toastID);
      }
    };
    getVideos();
  }, []);

  // Categories for filter
  const categories = [
    "For You",
    "Trending",
    "Development",
    "Design",
    "Fitness",
    "Cooking",
    "Photography",
    "Finance",
    "Gaming",
    "Music",
  ];

  const [activeCategory, setActiveCategory] = useState("For You");
  // if (state.loading) return toast.loading("Loading Data");
  // if (state.error) return toast.error("Error while fetching videos");

  return (
    <div className="flex-1 h-screen bg-gray-50 dark:bg-gray-950 overflow-auto">
      <Toaster />
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for videos, channels, topics..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-0 rounded-xl text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl relative transition-all">
              <Bell size={18} className="text-gray-700 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs">
                3
              </span>
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="px-6 py-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                activeCategory === category
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <Filter size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Main Videos Grid */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Clock size={20} className="text-indigo-500" />
            Recent Videos
          </h2>
          <button className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300">
            See all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {state.videos && state.videos.length > 0 ? (
            state.videos.map((video) => (
              <Link to={`/video-details/${video._id}`} key={video._id}>
                <Video key={video._id} video={video} />
              </Link>
            ))
          ) : (
            <div>No videos available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
