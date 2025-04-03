import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";

const LikeButton = ({ Id }) => {
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();
  const [userAction, setUserAction] = useState(null); // 'like' | 'dislike' | null

  const handleLike = async () => {
    try {
      // TODO: Add API call to toggle like
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const handleDislike = async () => {
    try {
      // TODO: Add API call to toggle dislike
    } catch (error) {
      toast.error("Failed to update dislike");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 px-4 py-2 rounded-full 
        ${
          userAction === "like"
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            : "hover:bg-gray-100 dark:bg-white dark:hover:bg-gray-800"
        }`}
      >
        <span>2</span>
        <ThumbsUp
          className={`w-5 ml-2 h-5 ${
            userAction === "like" ? "fill-current" : ""
          }`}
        />
        <span>{likes}</span>
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center gap-1 px-4 py-2 rounded-full
        ${
          userAction === "dislike"
            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <ThumbsDown
          className={`w-5 h-5 ${
            userAction === "dislike" ? "fill-current" : ""
          }`}
        />
        <span>{dislikes}</span>
      </button>
    </div>
  );
};

export default LikeButton;
