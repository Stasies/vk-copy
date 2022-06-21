import React, { useState, useEffect, useContext } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import { AuthContext } from "../../Context/AuthContext";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(
    currentUser.following?.includes(user?._id)
  );

  // useEffect(() => {
  //   setFollowed(currentUser.following.includes(user?.id));
  // }, [currentUser, user.id]);

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

  const handleClick = async () => {
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

  const HomeRightbar = () => {
    return (
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="birthdayContainer">
            <img className="birthdayImg" src="/assets/people/7.jpeg" alt="" />
            <span className="birthdayText">
              <b>Anna</b> and <b>3 other friends</b> have a Birthday today
            </span>
          </div>
          <img className="rightbarAd" src="assets/ad.jpeg" alt="" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <Online key={friend._id} friend={friend} />
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
          </button>
        )}
        {/* <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}
            </span>
          </div>
        </div> */}
        <div className="followingSection">
          <p cclassName="following">
            <b>{user?.following ? user.following.length : "0"}</b> following
          </p>
          <p cclassName="following">
            {" "}
            <b>{user?.followers ? user.followers.length : "0"}</b> followers
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{user ? <ProfileRightbar /> : ""}</div>
    </div>
  );
}
