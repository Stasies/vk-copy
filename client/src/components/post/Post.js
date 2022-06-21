import "./post.css";
import {
  MoreVert,
  ThumbUp,
  Send,
  NoEncryption,
  Delete,
  FavoriteBorderOutlined,
  ChatBubbleOutline,
  Favorite,
  MoreHoriz,
} from "@material-ui/icons";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  // const [commentLike, setCommentLike] = useState(post.comments.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [user, setUser] = useState({});
  const [replyer, setReplyer] = useState("");
  const replyUser = useRef();
  const currentPost = useRef();
  const comment = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    // const getComments = () =>{
    //   const res = await axios.get(`/`);
    // }
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/comment", {
        postId: post._id,
        username: user.username,
        userId: currentUser._id,
        comment: comment.current.value,
      });
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const deletePost = async (e) => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { userId: user._id },
      });
      console.log("deleted");
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const reply = (user) => {
    setUser(replyUser.current);
    setReplyer(user.username);
    console.log(replyer);
    comment.current.value = user.username + ", ";
  };

  // const addLike = async () =>{
  //       try {
  //     await axios.put("/posts/comment/" + post._id, {
  //       userId: currentUser._id,
  //       comment: comment.current.value,
  //     });
  //     console.log("deleted");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <>
      <div className="post" ref={currentPost}>
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img className="postProfileImg" src={PF + "user.png"} alt="" />
              </Link>
              <div className="postAbout">
                <div className="postUsername">{user.username}</div>
                <div className="postDate">{format(post.createdAt)}</div>
              </div>
            </div>
            <div className="postTopRight">
              {post.userId === currentUser._id && (
                <MoreHoriz
                  className="deletePost"
                  onMouseEnter={() => setOpenMore(true)}
                />
              )}
              {openMore && (
                <div
                  className="moreContainer"
                  onMouseLeave={() => setOpenMore(false)}
                >
                  <div className="moreOption" onClick={deletePost}>
                    Delete post
                  </div>
                  <div className="moreOption">Archive post</div>
                  <div className="moreOption">Add to bookmarks</div>
                  <div className="moreOption">Pin post</div>
                  <div className="moreOption">Disable comments</div>
                </div>
              )}
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>

            <img className="postImg" src={PF + post.img} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              {isLiked ? (
                <div
                  className="postLikes"
                  style={{ backgroundColor: "#FFEDED", color: "#FF3347" }}
                >
                  <Favorite
                    id={post.id}
                    className="likeIcon"
                    onClick={likeHandler}
                    style={{ color: "#FF3347" }}
                  />
                  <span
                    className="postLikeCounter"
                    style={{ color: "#FF3347" }}
                  >
                    {like}
                  </span>
                </div>
              ) : (
                <div
                  className="postLikes"
                  style={{ backgroundColor: "#edeef0" }}
                >
                  <FavoriteBorderOutlined
                    id={post.id}
                    className="likeIcon"
                    onClick={likeHandler}
                  />
                  <span
                    className="postLikeCounter"
                    style={{ color: "#818c99" }}
                  >
                    {like}
                  </span>
                </div>
              )}
              <div className="postComments">
                <ChatBubbleOutline className="likeIcon" />
                <span className="postLikeCounter">{post.comments?.length}</span>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="commentSeparator"></hr> */}
        <div className="commentSection">
          <div className="comments">
            {post.comments &&
              post.comments.map((c) => (
                <div className="commentContainer">
                  <div key={c._id} post={c} className="profileImgContainer">
                    <Link to={`/profile/${c.username}`}>
                      <img
                        className="commentProfileImg"
                        src={PF + "user.png"}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="commentTextContainer">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/profile/${c.username}`}
                    >
                      <p>
                        <b className="postUsername" ref={replyUser}>
                          {c.username}
                        </b>
                      </p>
                    </Link>
                    <p className="commentText">{c.comment}</p>
                    <div className="commentBottom">
                      <small className="reply" onClick={() => reply(c)}>
                        reply
                      </small>
                      <FavoriteBorderOutlined
                        // onClick={addLike}
                        className="heartIcon"
                      />
                    </div>
                    <hr></hr>
                  </div>
                </div>
              ))}
          </div>
          <form className="commentForm" onSubmit={handleComment}>
            <img className="commentProfileImg" alt="" src={PF + "user.png"} />
            <input
              className="commentInput"
              id="yourComment"
              type="text"
              placeholder=" Leave a comment"
              ref={comment}
            />
            <label>
              <button type="submit" className="sendComment">
                <Send className="sendIcon" />
              </button>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
