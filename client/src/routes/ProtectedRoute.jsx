import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ isAuthenticated, element }) => {
  isAuthenticated ? element : <Navigate to="/login" />;
  return <></>;
};

export default ProtectedRoute;
