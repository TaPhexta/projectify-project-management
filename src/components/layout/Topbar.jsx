import { useContext } from "react";
import ProjectContext from "../../context/ProjectContext";

import "./Topbar.css";

import { MdMenu, MdNotificationsNone } from "react-icons/md";
import Input from "../ui/Input/Input";

function Topbar({ toggleSidebar }) {
  const { searchQuery, setSearchQuery } = useContext(ProjectContext);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <MdMenu />
        </button>

        <div className="topbar-search-container">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
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
