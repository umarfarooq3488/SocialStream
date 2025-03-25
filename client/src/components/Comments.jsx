import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { MessageCircle, Send } from "lucide-react";
import { createComment, retrieveComments } from "../api/Comment.Api";
import Comment from "./Comment";

const Comments = ({ videoId }) => {
  const { state } = useUser();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [allComments, setAllComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setLoading(true);
    try {
      // TODO: Add API call to post comment
      const commentData = {
        content: comment,
      };
      const response = await createComment(commentData, videoId);
      console.log(response);
      setComment("");
      toast.success("Comment posted successfully");
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message || "Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await retrieveComments(videoId);
        if (response) {
          setAllComments(response.data.docs);
        }
      } catch (error) {
        console.log("Error while fetching comments", error);
      }
    };
    getComments();
  }, [videoId]);

  return (
    <div className="mt-6 space-y-4">
      <Toaster />
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Comments
        </h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-shrink-0">
          <img
            src={state?.user?.data?.user?.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-grow flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 
                     border border-gray-200 dark:border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     text-gray-700 dark:text-gray-300"
          />
          <button
            type="submit"
            disabled={loading || !comment.trim()}
            className="px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 
                     disabled:bg-gray-300 dark:disabled:bg-gray-700
                     text-white flex items-center gap-2 transition-colors
                     disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Post</span>
          </button>
        </div>
      </form>

      {/* Comments List - To be implemented */}
      <div className="space-y-4 mt-6">
        {allComments.length > 0 ? (
          allComments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Comments;
