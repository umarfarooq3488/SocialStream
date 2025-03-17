import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated); // Debug log

  if (!isAuthenticated) {
    <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
