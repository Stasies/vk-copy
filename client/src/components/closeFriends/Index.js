import React from "react";
import "./closeFriends.css";

const CloseFriends = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img src={PF + "user.png"} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{friend.username}</span>
    </li>
  );
};

export default CloseFriends;
