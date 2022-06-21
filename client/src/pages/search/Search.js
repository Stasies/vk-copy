import "./search.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import RightMenu from "../../components/rightMenu/RightMenu";
import Share from "../../components/share/Share";
import { Search as SearchIcon } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import NoPosts from "../../components/noPosts/NoPosts";
import Post from "../../components/post/Post";
import { Link } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const searchInput = useRef();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts`);
      setPosts(res.data);
    };
    fetchPosts();
    const fetchUsers = async () => {
      const res = await axios.get(
        `/users?username=${searchInput.current.value}`
      );
      setUsers(res.data);
    };
    fetchUsers();
  }, []);
  const findPosts = (e) => {
    console.log(searchInput.current.value);
    if (e.code === "Enter") {
      setFilteredPosts(
        posts.filter((post) => post.desc.includes(searchInput.current.value))
      );
      // setFilteredPeople(
      //   users.filter((user) =>
      //     user.username.includes(searchInput.current.value)
      //   )
      // );
      console.log(filteredPosts);
      console.log(users.username);
    }
  };

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="homeWrapper">
          <Sidebar />
          <div className="searchContainer">
            <div className="friendsTopNavigation">
              <div className="allFriends">
                <p>Search</p>
              </div>
            </div>
            <div className="searchInputWrapper">
              <SearchIcon className="searchInputIcon" />
              <input
                ref={searchInput}
                type="text"
                placeholder="Search"
                onKeyPress={(e) => findPosts(e)}
              />
            </div>
            {filteredPosts.length < 1 && <NoPosts value={"No results"} />}
            {searchInput && (
              <>
                {filteredPosts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}

                {/* <div className="friendsPeople">
                  {users.length > 0 && (
                    <div className="singleFriend">
                      <Link to={`/profile/${users.username}`}>
                        <div className="singleFriendImg"></div>
                      </Link>
                      <Link to={`/profile/${users.username}`}>
                        <div className="singleFriendAbout">
                          <b>{users.username}</b>
                          <p className="writeMessage">Write message</p>
                        </div>
                      </Link>
                    </div>
                  )}
                </div> */}
                {/* {users && <p>{users.username}</p>} */}
              </>
            )}
          </div>
          <RightMenu type="search" />
        </div>
      </div>
    </>
  );
};

export default Search;
