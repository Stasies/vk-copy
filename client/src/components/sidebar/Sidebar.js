import React, { useState, useEffect, useContext } from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Home,
  AccountCircleOutlined,
  NoteOutlined,
  ChatBubbleOutline,
  PeopleOutline,
  GroupOutlined,
  ImageOutlined,
  VideogameAssetOutlined,
  SentimentSatisfiedOutlined,
  WidgetsOutlined,
  MoneyOutlined,
  WorkOutline,
  StarOutline,
  InsertDriveFileOutlined,
} from "@material-ui/icons";
import CloseFriends from "../closeFriends/Index";
import { Users } from "../../dummyData";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Sidebar = () => {
  const [friends, setFriends] = useState([]);
  const { user, dispatch } = useContext(AuthContext);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const friendList = await axios.get("/users/friends/" + user._id);
  //       setFriends(friendList.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getFriends();
  // }, [user]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to={`/profile/${user.username}`} className="link">
            <li className="sidebarListItem">
              <AccountCircleOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">My profile</span>
            </li>
          </Link>
          <Link to="/" className="link">
            <li className="sidebarListItem">
              <NoteOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">News</span>
            </li>
          </Link>
          <Link to="/messenger" className="link">
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Messenger</span>
            </li>
          </Link>
          <Link to="/friends" className="link">
            <li className="sidebarListItem">
              <GroupOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Friends</span>
            </li>
          </Link>

          <li className="sidebarListItem">
            <GroupOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Communities</span>
          </li>

          <li className="sidebarListItem">
            <ImageOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Images</span>
          </li>

          <li className="sidebarListItem">
            <VideogameAssetOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Games</span>
          </li>

          <li className="sidebarListItem">
            <SentimentSatisfiedOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Stickers</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarListSecondary" disabled>
          <li className="sidebarListItem">
            <WidgetsOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Mini apps</span>
          </li>

          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarListSecondary">
          <li className="sidebarListItem">
            <StarOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>

          <li className="sidebarListItem">
            <InsertDriveFileOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Files</span>
          </li>
        </ul>
        {/* <ul className="sidebarFriendList">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <CloseFriends key={friend._id} friend={friend} />
            </Link>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
