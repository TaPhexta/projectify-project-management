import "./Topbar.css";

import { MdMenu, MdNotificationsNone } from "react-icons/md";

function Topbar({ toggleSidebar }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <MdMenu />
        </button>

        <input className="topbar-search" placeholder="Search..." />
      </div>

      <div className="topbar-right">
        <button className="icon-button">
          <MdNotificationsNone />
        </button>

        <div className="profile-preview">
          <div className="profile-avatar">OM</div>

          <div className="profile-details">
            <p className="profile-name">Oyama Mbatani</p>

            <span className="profile-role">Frontend Developer</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
