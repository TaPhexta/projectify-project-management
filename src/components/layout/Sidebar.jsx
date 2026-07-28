import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import navigation from "../../data/navigation";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <div
        className={sidebarOpen ? "sidebar-overlay active" : "sidebar-overlay"}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={sidebarOpen ? "sidebar active" : "sidebar"}>
        <div className="sidebar-logo">
          <h2>Projectify</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      isActive ? "sidebar-link active" : "sidebar-link"
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="sidebar-icon" />

                    <span>{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
