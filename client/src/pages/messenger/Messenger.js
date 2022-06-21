import React, { useContext, useEffect, useState, useRef } from "react";
import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import RightMenu from "../../components/rightMenu/RightMenu";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useRadioGroup } from "@material-ui/core";
import { io } from "socket.io-client";
import Sidebar from "../../components/sidebar/Sidebar";
function Messenger() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [showPeople, setShowPeople] = useState(false);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      if (!arrivalMessage) {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      }
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
        if (messages) {
          console.log(messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        if (friendList.data) {
          setFriends(friendList.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  const startNewChat = async (receiverId) => {
    console.log(user._id, receiverId);
    try {
      const newChat = await axios.post("/conversations", {
        senderId: user._id,
        receiverId: receiverId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="homeWrapper">
          <Sidebar />
          {currentChat ? (
            <div className="allFriendsContainer" style={{ height: "82vh" }}>
              <div
                className="friendsTopNavigation"
                style={{ postition: "sticky" }}
              >
                <p
                  style={{ color: "lightgray" }}
                  onClick={() => setCurrentChat(null)}
                >
                  Back
                </p>
                <p style={{ fontWeight: "500" }}>Chat title</p>
                <img
                  className="commentProfileImg"
                  src={PF + "user.png"}
                  alt=""
                />
              </div>
              <div className="messageHistory">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message
                      currentUser={user}
                      message={m}
                      own={m.sender === user._id}
                      currentChat={currentChat}
                    />
                  </div>
                ))}
              </div>
              <div className="chatboxBottom">
                <textarea
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  className="chatMessageInput"
                  placeholder="write something"
                ></textarea>
                {/* <button className="chatSubmitButton" onClick={handleSubmit}>
                  send
                </button> */}
              </div>
            </div>
          ) : (
            <div className="allFriendsContainer">
              <div className="friendsTopSearch">
                <input
                  type="text"
                  placeholder="Search"
                  onClick={() => setShowPeople(true)}
                />
              </div>
              {showPeople ? (
                <div className="startChat">
                  {friends.map((friend) => (
                    <div
                      className="startChatPerson"
                      onClick={() => startNewChat(friend._id)}
                    >
                      <div className="startChatPersonImg">
                        <img src={PF + "user.png"} alt="" />
                      </div>
                      <div className="startChatPersonName">
                        {friend.username}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {conversations.map((chat) => (
                    <div
                      className="singleChatContainer"
                      onClick={() => setCurrentChat(chat)}
                    >
                      <Conversation
                        conversation={chat}
                        lastMessage={messages[messages.length - 1]}
                        currentUser={user}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          <RightMenu type="messenger" />
          {/* <div className="chatMenuWrapper">
            <input placeholder="search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div> */}
          {/* <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message
                          currentUser={user}
                          message={m}
                          own={m.sender === user._id}
                          currentChat={currentChat}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chatboxBottom">
                    <textarea
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      className="chatMessageInput"
                      placeholder="write something"
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">
              <ChatOnline />
              <ChatOnline />
              <ChatOnline />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Messenger;
