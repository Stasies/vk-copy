import React from "react";
import "./chatOnline.css";

const chatOnline = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={PF + "people/av3.jpeg"} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John</span>
      </div>
    </div>
  );
};

export default chatOnline;
