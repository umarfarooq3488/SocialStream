import React, { useState } from "react";
import EditModal from "./EditModal";

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

  return (
    <div className="w-full mx-auto">
      {/* Cover Image */}
      <div className="w-full h-56 relative overflow-hidden rounded-t-lg">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${fullName}'s cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-200" />
        )}
      </div>

      {/* Profile Info Container */}
      <div className="bg-white rounded-b-lg shadow-md">
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center">
          {/* Avatar */}
          <div className="relative -mt-16 md:-mt-20">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {avatar ? (
                <img
                  src={avatar}
                  alt={`${fullName}'s avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">
                    {fullName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{fullName}</h1>
            <p className="text-gray-500">@{userName}</p>
            <p className="text-gray-500 text-sm mt-1">{email}</p>
          </div>

          {/* Subscribe Button */}
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                isSubscribed
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
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
        <div className="border-t border-gray-200">
          <div className="flex divide-x divide-gray-200">
            <div className="flex-1 px-4 py-3 text-center">
              <span className="block font-bold text-gray-800">
                {subscribersCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">Subscribers</span>
            </div>
            <div className="flex-1 px-4 py-3 text-center">
              <span className="block font-bold text-gray-800">
                {subscribedToCount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">Subscribed To</span>
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
