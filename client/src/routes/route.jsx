import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Home from "../Home";
import ProtectedRoute from "./ProtectedRoute";

// Example authentication status (replace with real authentication logic)
const isAuthenticated = false;

const AppRoutes = () => {
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    {
      path: "/home",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Home />
        </ProtectedRoute>
      ),
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
