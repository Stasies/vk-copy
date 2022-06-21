import React, { useContext, useRef, useState } from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Image,
  Clear,
  Collections,
} from "@material-ui/icons";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  let [file, setFile] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const setImage = (e) => {
    setFile(e.target.files[0]);
    document.getElementById("sharedImg").style.cssText = "display: flex;";
  };
  const removeImg = (e) => {
    file = null;
    document.getElementById("sharedImg").style.cssText = "display: none;";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
      setShareOpen(false);
    } catch (err) {}
  };
  return (
    <div className={shareOpen ? "shareOpen" : "share"}>
      <div
        className="shareWrapper"
        // onFocus={() => setShareOpen(true)}
        // onBlur={() => setShareOpen(false)}
      >
        <div className="shareTop">
          <img className="shareProfileImg" src={PF + "user.png"} alt="" />
          <textarea
            placeholder={"What's new?"}
            className={shareOpen ? "shareInputOpen" : "shareInput"}
            ref={desc}
            onClick={() => setShareOpen(true)}
          />
        </div>
        <div id="sharedImg">
          <div className="left">
            <Image style={{ color: "grey", fontSize: "18" }} />
            <small> files added</small>
          </div>
          <div className="right">
            <Clear
              style={{ fontSize: "18", cursor: "pointer" }}
              onClick={removeImg}
            />
          </div>
        </div>
        {shareOpen && (
          <>
            <hr className="shareHr" />
            <form className="shareBottom" onSubmit={handleSubmit}>
              <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                  <Collections htmlColor="grey" className="shareIcon" />
                  {/* <span className="shareOptionText">Photo or Video</span> */}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg,.svg"
                    // onChange={(e) => setFile(e.target.files[0])}
                    onChange={setImage}
                  />
                </label>
              </div>
              <button className="shareButton" type="submit">
                Share
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Share;
