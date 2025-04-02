import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVideoDetails } from "../api/VideoApi";
import toast from "react-hot-toast";
import Comments from "./Comments";
import { addToHistory } from "../api/UserApi";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const data = await getVideoDetails(id);
        console.log(data);
        setVideo(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleVideoPlay = async () => {
    try {
      const res = await addToHistory(id);
      console.log(res);
    } catch (error) {
      console.log("Error! while adding video to history", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <div
      className="p-6  bg-gradient-to-b from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-950 "
    >
      <div className="w-full bg-slate-100 aspect-video rounded-xl overflow-hidden">
        <video
          onPlay={handleVideoPlay}
          src={video.videoFile}
          controls
          className="w-full h-full"
        />
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {video.title}
        </h1>
        <Link to={`/channel-details/${video.owner.userName}`}>
          <div className="mt-2 flex items-center">
            <img
              src={video.owner.avatar}
              alt={video.owner.fullName}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {video.owner.fullName}
              </p>
              <p className="text-sm text-gray-500">{video.views} views</p>
            </div>
          </div>
        </Link>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {video.description}
        </p>
      </div>
      <div className="comments">
        <Comments videoId={id} />
      </div>
    </div>
  );
};

export default VideoDetails;
