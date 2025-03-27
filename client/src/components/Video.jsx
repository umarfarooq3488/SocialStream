import React from "react";
import { formatDistanceToNow } from "date-fns";

const Video = ({ video }) => {
  const formatTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div>
      <div
        key={video._id}
        className="bg-white cursor-pointer hover:scale-105 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700"
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
              <img
                src={video.owner.avatar}
                alt={video.owner.fullName}
                className="w-full rounded-lg h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-100 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {video.owner.fullName}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                {video.views} • {formatTimeAgo(video.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
