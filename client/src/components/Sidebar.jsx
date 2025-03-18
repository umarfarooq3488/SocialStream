// Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Compass,
  Bookmark,
  PlaySquare,
  Clock,
  ThumbsUp,
  Cog,
  Users,
  Film,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUser } from "../context/UserContext";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { state } = useUser();

  const mainMenuItems = [
    {
      icon: <Home size={20} />,
      label: "Home",
      notifications: 0,
      path: "/home",
    },
    {
      icon: <Compass size={20} />,
      label: "My Channel",
      notifications: 5,
      path: `/channel-details/${state?.user?.data?.user?.userName}`, // Added optional chaining
    },
    {
      icon: <Film size={20} />,
      label: "Upload Video",
      notifications: 0,
      path: "/upload-video",
    },
    {
      icon: <Users size={20} />,
      label: "Following",
      notifications: 2,
      path: null,
    },
  ];

  const libraryItems = [
    { icon: <PlaySquare size={20} />, label: "History", notifications: 0 },
    { icon: <Clock size={20} />, label: "Watch Later", notifications: 3 },
    { icon: <Bookmark size={20} />, label: "Saved", notifications: 0 },
    { icon: <ThumbsUp size={20} />, label: "Favorites", notifications: 0 },
  ];

  const subscriptionItems = [
    { avatar: "🌟", name: "Tech Insider", isLive: true, newContent: false },
    { avatar: "🎮", name: "GameVerse", isLive: false, newContent: true },
    { avatar: "🎵", name: "Rhythm Lab", isLive: false, newContent: false },
    { avatar: "🎨", name: "Design Daily", isLive: true, newContent: false },
    { avatar: "📚", name: "Knowledge Hub", isLive: false, newContent: true },
  ];

  return (
    <aside
      className={`h-screen ${expanded ? "w-64" : "w-[20vw]"} 
      bg-gradient-to-b from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-950 
      shadow-lg transition-all duration-300 flex flex-col
      border-r border-gray-100 dark:border-gray-800`}
    >
      {/* Logo and collapse button */}
      <div className="px-4 py-6 flex items-center justify-between">
        {expanded && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Stream
            </span>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          {expanded ? (
            <ChevronLeft
              size={18}
              className="text-gray-600 dark:text-gray-300"
            />
          ) : (
            <ChevronRight
              size={18}
              className="text-gray-600 dark:text-gray-300"
            />
          )}
        </button>
      </div>

      {/* Main navigation */}
      <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        <div className="px-3 py-4">
          {mainMenuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center px-3 py-3 my-1 text-gray-700 dark:text-gray-300 
      ${
        index === 0
          ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-l-4 border-indigo-500 dark:border-indigo-400"
          : "hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
      } 
      rounded-lg cursor-pointer transition-all`}
            >
              <div
                className={`${
                  index === 0
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.icon}
              </div>

              {expanded && (
                <>
                  <span
                    className={`ml-3 flex-grow ${
                      index === 0 ? "font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.notifications > 0 && (
                    <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.notifications}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </div>

        {/* Library Section */}
        <div className="mt-4 px-3">
          {expanded ? (
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Your Library
              </span>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
          )}

          {libraryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-3 my-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-all"
            >
              <div className="text-gray-500 dark:text-gray-400">
                {item.icon}
              </div>

              {expanded && (
                <>
                  <span className="ml-3 flex-grow">{item.label}</span>
                  {item.notifications > 0 && (
                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
                      {item.notifications}
                    </span>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Subscriptions */}
        {expanded && (
          <div className="mt-6 px-3">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Following
              </span>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <ChevronRight size={16} />
              </button>
            </div>

            {subscriptionItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-2 my-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-all"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                    {item.avatar}
                  </div>
                  {item.isLive && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                  {item.newContent && !item.isLive && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                </div>

                <span className="ml-3 text-sm flex-grow truncate">
                  {item.name}
                </span>

                {item.isLive && (
                  <span className="text-xs text-red-500 font-medium">LIVE</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer transition-all">
          <Cog size={20} className="text-gray-500 dark:text-gray-400" />
          {expanded && <span className="ml-3 text-sm">Settings</span>}
        </div>

        {expanded && (
          <div className="mt-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-4">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Upgrade to Stream Pro for ad-free viewing and exclusive content
            </p>
            <button className="mt-2 w-full py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all">
              Upgrade
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
