import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Home from "../Home";
import ProtectedRoute from "./ProtectedRoute";
import { useUser } from "../context/UserContext";
import ChannelDetails from "../components/ChannelDetails";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  const { state } = useUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute isAuthenticated={state.isAuthenticated}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route
            path="/channel-details/:userName"
            element={<ChannelDetails />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
