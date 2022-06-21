import React, { useContext, useEffect, useState } from "react";
import "./message.css";
import { format } from "timeago.js";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Message = ({ message, own, currentChat }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const URL = process.env.REACT_MAIN_URL;
  const user = useContext(AuthContext);
  const [receiver, setReceiver] = useState([]);

  useEffect(() => {
    const getFriends = () => {
      try {
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentChat.members, user]);

  useEffect(() => {
    if (!receiver) {
      const receiverId = currentChat?.members.find(
        (member) => member !== user._id
      );
      console.log(receiverId);
      const fetchPosts = async () => {
        const res = await axios.get("/users?userId=" + receiverId);
        console.log(res.data);
        setReceiver(res.data);
        console.log(receiver);
      };
      fetchPosts();
      console.log(receiver);
    }
  }, [currentChat.members, user, receiver]);
  // console.log(user);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get("/conversations/" + currentUser._id);
  //       setConversations(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getConversations();
  // }, [currentUser._id]);

  // useEffect(() => {
  //   const friendId = conversations.members.find((m) => m !== currentUser._id);
  //   const getUser = async () => {
  //     try {
  //       const res = await axios.get("/users?userId=" + friendId);
  //       setUser(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversations]);

  return (
    <div className="message">
      <div className="messageSenderImg">
        <img className="postProfileImg" src={PF + "user.png"} alt="" />
      </div>
      <div className="messageTextContainer">
        <div className="messageSenderName">
          {/* <span className="postUsername">{user.username}</span> */}
          {/* {own ? (
            <span className="postUsername">{user.username}</span>
          ) : (
            <span className="postUsername">{receiver.username}</span>
          )} */}
          <span className="postDate">{format(message.createdAt)}</span>
        </div>
        <div className="messageText">{message?.text}</div>
      </div>
    </div>
    // <div className={own ? "message own" : "message"}>
    //   <div className="messageTop">
    //     {own ? (
    //       <Link to={URL + `/profile/${user._id}`} replace>
    //         <img
    //           className="messageImg"
    //           src={
    //             user.profilePicture ? PF + user.profilePicture : PF + "user.png"
    //           }
    //           alt=""
    //         />
    //       </Link>
    //     ) : (
    //       <Link to={URL + `/profile/${receiver}`} replace>
    //         <img
    //           alt=""
    //           className="messageImg"
    //           src={
    //             receiver?.profilePicture
    //               ? PF + receiver.profilePicture
    //               : PF + "user.png"
    //           }
    //         />
    //       </Link>
    //     )}
    //     <p className="messageText">{message.text}</p>
    //   </div>
    //   <div className="messageBottom">{format(message.createdAt)}</div>
    // </div>
  );
};

export default Message;
