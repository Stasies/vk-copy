import axios from "axios";
import React, { useState, useEffect } from "react";
import "./conversation.css";

const Conversation = ({ conversation, currentUser, lastMessage }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  console.log(lastMessage);
  return (
    // <div className="conversation">
    //   <span className="conversationName">{user?.username}</span>
    // </div>
    <div className="singleChat">
      <div className="singleChatImg">
        <img className="profilePicture" src={PF + "user.png"} alt="" />
      </div>
      <div className="singleChatRight">
        <div className="singleChatName">
          <span className="chatName">{user?.username}</span>
          <span className="time">14:30</span>
        </div>
        <div className="singleChatPreview">{lastMessage}</div>
      </div>
    </div>
  );
};

export default Conversation;
