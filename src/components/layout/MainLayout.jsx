import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import ProjectModal from "../../components/common/ProjectModal/ProjectModal";

function MainLayout() {
  // Controls the mobile sidebar.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Controls the desktop collapsed/expanded state.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function toggleSidebarCollapse() {
    setSidebarCollapsed((prev) => !prev);
  }

  return (
    <div className={`layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebarCollapse={toggleSidebarCollapse}
      />

      <div className="layout-content">
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="layout-main">
          <Outlet />

          {/* Global project modal. */}
          <ProjectModal />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
