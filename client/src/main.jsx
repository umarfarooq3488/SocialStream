import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/route";
import { UserProvider } from "./context/UserContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </React.StrictMode>
);
