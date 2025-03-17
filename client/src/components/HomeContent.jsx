// HomeContent.jsx
import React, { useState } from "react";
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

const HomeContent = () => {
  // Mock data for videos
  const videos = [
    {
      id: 1,
      thumbnail: "/api/placeholder/320/180",
      title: "Building a Responsive Dashboard with React and Tailwind",
      channel: "DevMastery",
      views: "1.2M views",
      posted: "3 days ago",
      duration: "10:43",
      avatar: "💻",
      trending: true,
    },
    {
      id: 2,
      thumbnail: "/api/placeholder/320/180",
      title: "How Top Performers Structure Their Morning Routine",
      channel: "Lifestyle Guide",
      views: "890K views",
      posted: "1 week ago",
      duration: "15:21",
      avatar: "🌞",
      trending: false,
    },
    {
      id: 3,
      thumbnail: "/api/placeholder/320/180",
      title: "Advanced Tailwind CSS Techniques You Need to Know",
      channel: "CSS Wizards",
      views: "500K views",
      posted: "2 weeks ago",
      duration: "22:07",
      avatar: "🎨",
      trending: false,
    },
    {
      id: 4,
      thumbnail: "/api/placeholder/320/180",
      title: "The Secrets of Icelands Volcanic Landscapes",
      channel: "Nature Explorers",
      views: "2.5M views",
      posted: "1 month ago",
      duration: "18:32",
      avatar: "🔬",
      trending: true,
    },
    {
      id: 5,
      thumbnail: "/api/placeholder/320/180",
      title: "No-Equipment HIIT Workout for Beginners",
      channel: "Fitness Pro",
      views: "3.1M views",
      posted: "2 months ago",
      duration: "15:00",
      avatar: "💪",
      trending: false,
    },
    {
      id: 6,
      thumbnail: "/api/placeholder/320/180",
      title: "Making Artisan Sourdough Bread from Scratch",
      channel: "Baking Masters",
      views: "1.7M views",
      posted: "3 weeks ago",
      duration: "12:45",
      avatar: "🍰",
      trending: false,
    },
  ];

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

  return (
    <div className="flex-1 h-screen bg-gray-50 dark:bg-gray-950 overflow-auto">
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

      {/* Trending Section */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            {/* <Trending size={20} className="text-indigo-500" /> */}
            Trending Now
          </h2>
          <button className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300">
            See all
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos
            .filter((video) => video.trending)
            .map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 group"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                  <div className="absolute top-2 left-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-lg">
                    Trending
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      {video.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-100 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {video.channel}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        {video.views} • {video.posted}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-gray-500 dark:text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <ThumbsUp size={16} />
                      <span className="text-xs">Like</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-xs">Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <Share2 size={16} />
                      <span className="text-xs">Share</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <Bookmark size={16} />
                      <span className="text-xs">Save</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
          {videos
            .filter((video) => !video.trending)
            .map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700 group"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      {video.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-100 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {video.channel}
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                        {video.views} • {video.posted}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-gray-500 dark:text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <ThumbsUp size={16} />
                      <span className="text-xs">Like</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-xs">Comment</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <Share2 size={16} />
                      <span className="text-xs">Share</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                      <Bookmark size={16} />
                      <span className="text-xs">Save</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
