import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiCalendar,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import "./Sidebar.css";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  toggleSidebarCollapse,
}) {
  const links = [
    {
      label: "Dashboard",
      path: "/",
      icon: <FiHome />,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: <FiFolder />,
    },
    {
      label: "Calendar",
      path: "/calendar",
      icon: <FiCalendar />,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FiUser />,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <FiSettings />,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-logo">
          <h2>{sidebarCollapsed ? "P" : "Projectify"}</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className="sidebar-link"
                  onClick={() => setSidebarOpen(false)}
                  title={sidebarCollapsed ? link.label : undefined}
                >
                  <span className="sidebar-icon">{link.icon}</span>

                  <span className="sidebar-link-text">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop collapse button */}
        <button
          className="sidebar-collapse-button"
          onClick={toggleSidebarCollapse}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
