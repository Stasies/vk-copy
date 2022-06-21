import React, { useState, useEffect, useContext, useRef } from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./profile.css";
import axios from "axios";
import {
  LockOutlined,
  AccessTimeOutlined,
  CreditCardOutlined,
} from "@material-ui/icons";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const statusText = useRef();
  const school = useRef();
  const university = useRef();
  const work = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showFullInformation, setShowFullInformation] = useState(false);
  const [friends, setFriends] = useState([]);
  const username = useParams().username;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following?.includes(user?._id)
  );

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchFriends = async () => {
      let res = await axios.get(`/users/friends/${user._id}`);
      if (friends.length === 0) {
        setFriends(res.data);
      }
    };
    fetchFriends();
  });

  const saveStatus = async () => {
    try {
      await axios.put(`/users/${user._id}`, {
        statusQuote: statusText.current.value,
        userId: user._id,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const editPersonalInfo = async () => {
    setEditing(true);
    try {
      await axios.put(`/users/${user._id}`, {
        school: school.current.value,
        university: university.current.value,
        work: work.current.value,
        userId: user._id,
      });
      setEditing(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const addFriend = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="homeContainer">
          <div className="profileWrapper">
            <Sidebar />
            <div className="profilePage">
              <div className="profileLeft">
                <div className="profilePersonContainer">
                  <div className="img">
                    <img src={PF + "user.png"} alt="" />
                  </div>
                  <div className="profileActions">
                    {user.username === currentUser.username && (
                      <button>Edit</button>
                    )}
                    {user.username !== currentUser.username && (
                      <>
                        {followed ? (
                          <button
                            disabled
                            style={{
                              backgroundColor: "#5181b8",
                              color: "white",
                            }}
                          >
                            You are friends
                          </button>
                        ) : (
                          <button
                            onClick={addFriend}
                            style={{
                              backgroundColor: "#5181b8",
                              color: "white",
                            }}
                          >
                            Add friend
                          </button>
                        )}
                      </>
                    )}
                    <div className="additional">
                      <div className="additionalItem">
                        <AccessTimeOutlined className="profileIcon" />
                        Memories
                      </div>
                      <div className="additionalItem">
                        <CreditCardOutlined className="profileIcon" />
                        Money transfers
                      </div>
                      {user.username === currentUser.username && (
                        <>
                          <hr />
                          <div className="security">
                            <div className="securityIcon">
                              <LockOutlined className="profileIcon" />
                            </div>
                            <div className="secturityText">
                              <p>
                                Stay in touch with people not in your friend
                                list
                              </p>
                              <p className="securityLink">
                                Make your profile public
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="friendsContainer">
                  <div className="friendsContainerTop">
                    <div className="friendsContainerTopLeft">Friends</div>
                    <div className="friendsContainerTopRight">updates</div>
                  </div>
                  <div className="friendsContainerCenter">
                    <div className="friends">
                      {friends?.map((friend) => (
                        <Link to={`/profile/${friend.username}`}>
                          <div className="friend">
                            <div className="friendImg"></div>
                            <p className="name">{friend.username}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="profileRight">
                <div className="profileRightTop">
                  <div
                    className="profileRightTopWrapper"
                    // style={
                    //   editing ? { minHeight: "500px" } : { minHeight: "auto" }
                    // }
                  >
                    <div className="profileRightTopNameContainer">
                      <div className="userName">
                        <h1 className="h1UserName">{user.username}</h1>
                        <p className="online">online</p>
                      </div>
                      {status ? (
                        <>
                          <input
                            type="text"
                            placeholder="Set status"
                            className="statusText"
                            ref={statusText}
                          />
                          <button className="saveStatus" onClick={saveStatus}>
                            Save
                          </button>
                        </>
                      ) : (
                        <p className="status" onClick={() => setStatus(true)}>
                          {user.statusQuote ? user.statusQuote : "Set status"}
                        </p>
                      )}
                    </div>
                    <hr />
                    <div className="profileRightTopInfo">
                      <div className="profileRightTopInfoLeft">
                        <p>Birthday:</p>
                        <p>Relationship:</p>
                        {user.city && <p>City:</p>}
                        {showFullInformation && (
                          <>
                            {user.school && <p>School:</p>}
                            {user.university && <p>University:</p>}
                            {user.work && <p>Work:</p>}
                            {user.email && <p>Email:</p>}
                            {user.phone && <p>Phone number:</p>}
                          </>
                        )}
                      </div>
                      <div className="profileRightTopInfoRight">
                        <p>
                          {" "}
                          {user.birthday ? user.birthday : "not specified"}
                        </p>
                        <p>
                          {" "}
                          {user.relationship === 1
                            ? "Single"
                            : user.relationship === 2
                            ? "Married"
                            : "not specified"}
                        </p>
                        {user.city && <p>{user.city}</p>}
                        {showFullInformation && (
                          <>
                            {!editing ? (
                              <>
                                {user.school && <p>{user.school}</p>}
                                {user.university && <p>{user.university} </p>}
                                {user.work && <p>{user.work}</p>}
                                {user.email && <p>{user.email}</p>}
                                {user.phone && <p>{user.phone}</p>}
                                {/* {user.username === currentUser.username && (
                                  <p onClick={() => setEditing(true)}>edit</p>
                                )} */}
                              </>
                            ) : (
                              <>
                                <input
                                  type="text"
                                  ref={school}
                                  placeholder={
                                    user.school ? user.school : "not specified"
                                  }
                                />
                                <input
                                  type="text"
                                  ref={university}
                                  placeholder={
                                    user.university
                                      ? user.university
                                      : "not specified"
                                  }
                                />
                                <input
                                  type="text"
                                  ref={work}
                                  placeholder={
                                    user.work ? user.work : "not specified"
                                  }
                                />
                                <p onClick={editPersonalInfo}>Save</p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className="showFullInformation"
                      onClick={() =>
                        setShowFullInformation(!showFullInformation)
                      }
                    >
                      <p>
                        {showFullInformation
                          ? "Hide information"
                          : "Show full information"}
                      </p>
                    </div>
                    <hr />
                  </div>
                </div>
                <div className="profileRightBottom">
                  <Feed username={username} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
