import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";

import router from "./routes/router";
import { ProjectProvider } from "./context/ProjectContext";

import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/utilities.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </React.StrictMode>
);
