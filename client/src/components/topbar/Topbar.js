import React, { useContext, useState } from "react";
import "./topbar.css";
import {
  Search,
  Person,
  Notifications,
  ChatAuthContext,
  KeyboardArrowDown,
  NotificationsNone,
  ViewComfy,
  SettingsOutlined,
  ExitToAppOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { logoutCall } from "../../apiCalls";

const Topbar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [openSettings, setOpenSettings] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    logoutCall(
      {
        user: user,
      },
      dispatch
    );
  };

  return (
    <div className="topbarContainer">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">VK</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon md-10" />
            <Link to="/search">
              <input placeholder="Search..." className="searchInput" />
            </Link>
          </div>
          {user && <NotificationsNone className="topbarIconItem" />}
        </div>
        {user && (
          <>
            <div className="topbarRight">
              {/* <div className="topbarIcons">
            <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">3</span>
            </div>
            <div className="topbarIconItem">
            <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div> */}
              <ViewComfy className="topbarIconItem" />
              <img src={PF + "user.png"} alt="" className="topbarImg" />
              <KeyboardArrowDown
                className="topbarIconItemArrow"
                onClick={() => setOpenSettings(!openSettings)}
              />
              {openSettings && (
                <div
                  className="moreContainer"
                  style={{ top: "40px", fontSize: "12px" }}
                >
                  <div className="moreOption">
                    <Link to="/settings">
                      <SettingsOutlined className="sidebarIcon" />
                      Settings
                    </Link>
                  </div>
                  <div className="moreOption">
                    <ExitToAppOutlined
                      className="sidebarIcon"
                      onClick={handleClick}
                    />
                    Log out
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
