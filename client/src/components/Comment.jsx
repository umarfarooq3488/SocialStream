import React from "react";
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment, id }) => {
  const formatTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div
      key={id}
      className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg group"
    >
      <div className="flex-shrink-0">
        <img
          src={comment.commentedBy?.avatar}
          alt={comment.commentedBy?.fullName}
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>

      {/* Comment Content */}
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-gray-900 dark:text-white">
            {comment.commentedBy?.fullName}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          {comment.content}
        </p>

        {/* Comment Actions */}
        <div className="mt-2 flex items-center gap-4">
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-500">
            <ThumbsUp className="w-4 h-4" />
            <span>{comment.likes || 0}</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
            <ThumbsDown className="w-4 h-4" />
            <span>{comment.dislikes || 0}</span>
          </button>
          <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            Reply
          </button>
        </div>
      </div>

      {/* Comment Menu */}
      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export default Comment;
