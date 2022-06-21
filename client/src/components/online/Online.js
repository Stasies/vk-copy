import React from "react";
import "./online.css";

const Online = ({ friend }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <img
        src={
          friend.profilePicture ? PF + friend.profilePicture : PF + "user.png"
        }
        alt=""
      />
      <span className="rightbarUsername">{friend.username}</span>
    </li>
  );
};

export default Online;
