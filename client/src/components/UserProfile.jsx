import React, { useState } from "react";
import EditModal from "./EditModal";
import { ToggleSubscribe } from "../api/SubscribeApi";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = ({ channelData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: channelData.fullName,
    email: channelData.email,
  });

  const {
    fullName,
    userName,
    subscribersCount,
    subscribedToCount,
    isSubscribed,
    avatar,
    coverImage,
    email,
  } = channelData;
  const [IsSubscribed, setIsSubscribed] = useState(isSubscribed);

  const handleSubscribeBtn = async () => {
    try {
      const res = await ToggleSubscribe(channelData._id);
      IsSubscribed
        ? toast.success("Success! Unsubscribed")
        : toast.success("Success! Subscribed");
      setIsSubscribed((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("Error! couldn't subscribe");
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-100 dark:bg-gray-900">
      <Toaster />
      {/* Cover Image */}
      <div className="w-full h-56 relative overflow-hidden rounded-t-lg">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${fullName}'s cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600" />
        )}
      </div>

      {/* Profile Info Container */}
      <div className="rounded-b-lg shadow-md bg-white dark:bg-gray-800">
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center">
          {/* Avatar */}
          <div className="relative -mt-16 md:-mt-20">
            <div className="w-20 dark:border-4 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-500 shadow-lg">
              {avatar ? (
                <img
                  src={avatar}
                  alt={`${fullName}'s avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-2xl text-gray-500 dark:text-gray-400">
                    {fullName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {fullName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">@{userName}</p>
          </div>

          {/* Subscribe Button */}
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={handleSubscribeBtn}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                IsSubscribed
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {IsSubscribed ? "Subscribed" : "Subscribe"}
            </button>

            {/* Edit Profile Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="flex divide-x divide-gray-200 dark:divide-gray-700">
            <div className="flex-1 px-4 py-3 text-center">
              <span className="block font-bold text-gray-800 dark:text-white">
                {subscribersCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Subscribers
              </span>
            </div>
            <div className="flex-1 px-4 py-3 text-center">
              <span className="block font-bold text-gray-800 dark:text-white">
                {subscribedToCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Subscribed To
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditModal
        isModalOpen={isModalOpen}
        formData={formData}
        setFormData={setFormData}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default UserProfile;
