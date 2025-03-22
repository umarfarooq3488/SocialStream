import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { channelDetails } from "../api/UserApi";
import { Sidebar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import UserProfile from "./UserProfile";

const ChannelDetails = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const { state } = useUser();
  const [channelData, setChannelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      const loadingToastId = toast.loading("Loading...");
      try {
        if (!state.isAuthenticated) {
          navigate("/login");
          return;
        }

        setLoading(true);
        const data = await channelDetails(userName);
        setChannelData(data);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
        toast.dismiss(loadingToastId); // Dismiss the loading toast
      }
    };

    fetchChannelData();
  }, [userName, state.isAuthenticated, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return null;

  return (
    <div className="w-full">
      <Toaster />
      {channelData && <UserProfile channelData={channelData} />}
    </div>
  );
};

export default ChannelDetails;
