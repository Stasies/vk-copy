import "./friends.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import { MoreHoriz } from "@material-ui/icons";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Rightbar from "../../components/rightbar/Rightbar";
import RightMenu from "../../components/rightMenu/RightMenu";

const Friends = ({ user }) => {
  const [showMore, setShowMore] = useState(false);
  const [friends, setFriends] = useState([]);
  const username = useParams().username;

  console.log(user._id);
  useEffect(() => {
    const fetchFriends = async () => {
      let res = await axios.get(`/users/friends/${user._id}`);
      if (res) {
        setFriends(res.data);
      }
      console.log(friends);
    };
    fetchFriends();
  });
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="homeWrapper">
          <Sidebar />
          <div className="allFriendsContainer">
            <div className="friendsTopNavigation">
              <div className="allFriends">
                <p>
                  All friends <span>{user.followers.length}</span>
                </p>
              </div>
              <div className="findFriends">
                <button>Find friends</button>
              </div>
            </div>
            <div className="friendsTopSearch">
              <input type="text" placeholder="Search friends" />
            </div>
            <div className="friendsPeople">
              {friends?.map((friend) => (
                <div className="singleFriend">
                  <Link to={`/profile/${friend.username}`}>
                    <div className="singleFriendImg"></div>
                  </Link>
                  <Link to={`/profile/${friend.username}`}>
                    <div className="singleFriendAbout">
                      <b>{friend.username}</b>
                      {/* <p className="singleFriendInfoText">
                      УрФУ им. первого Президента России Б. Н. Ельцина
                    </p> */}
                      <p className="writeMessage">Write message</p>
                    </div>
                  </Link>
                  <div className="singleFriendMore">
                    <MoreHoriz
                      className="deletePost"
                      onMouseEnter={() => setShowMore(true)}
                    />
                  </div>
                  {showMore && (
                    <>
                      <div
                        className="singleFriendMoreContainer"
                        onMouseLeave={() => setShowMore(false)}
                      >
                        <div className="singleFriendMoreOption">
                          <p>Show friends</p>
                        </div>
                        <div className="singleFriendMoreOption">
                          <p>Suggest friends</p>
                        </div>
                        <div className="singleFriendMoreOption">
                          <p>Unfriend</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <RightMenu type="friends" />
        </div>
      </div>
    </>
  );
};

export default Friends;
