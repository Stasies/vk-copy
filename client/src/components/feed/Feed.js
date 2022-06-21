import React, { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import NoPosts from "../noPosts/NoPosts";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const path = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user?._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.length < 1 ? (
          <NoPosts />
        ) : (
          <>
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
