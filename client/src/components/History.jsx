import React, { useState, useEffect } from "react";
import { Clock, Search, Trash2 } from "lucide-react";
import { getHistory } from "../api/UserApi";
import Video from "./Video";
import toast from "react-hot-toast";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserHistory = async () => {
      try {
        setLoading(true);
        const response = await getHistory();
        // Check if response has watchHistory array
        console.log(response.data);
        setHistory(response.data || []);
      } catch (error) {
        console.error("Error while fetching user history:", error);
        toast.error("Failed to load watch history");
      } finally {
        setLoading(false);
      }
    };
    getUserHistory();
  }, []);
  console.log(history);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Watch History
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search watch history"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 
                           dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.length > 0 ? (
          history.map((video) => (
            <div
              key={video._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm 
                     hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
            >
              <Video video={video} />
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400">
            No videos in watch history
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
