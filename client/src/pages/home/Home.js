import React from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import RightMenu from "../../components/rightMenu/RightMenu";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="homeWrapper">
          <Sidebar />
          <Feed className="feed" />
          <RightMenu type="homepage" />
        </div>
      </div>
    </>
  );
};

export default Home;
