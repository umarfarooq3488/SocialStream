import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/route";
import { UserProvider } from "./context/UserContext";
import { VideoProvider } from "./context/VideosContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <VideoProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </VideoProvider>
  </React.StrictMode>
);
