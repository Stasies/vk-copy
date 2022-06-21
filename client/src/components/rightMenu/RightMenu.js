import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./rightMenu.css";

const RightMenu = ({ type }) => {
  const [selectedElement, setSelectedElement] = useState();

  const selectElement = (e) => {
    setSelectedElement(e.innerHTML);
  };
  console.log(selectedElement);
  useEffect(() => {
    if (type === "friends") {
      setSelectedElement("My friends");
    } else if (type === "homepage") {
      setSelectedElement("News");
    } else if (type === "search") {
      setSelectedElement("All");
    } else if (type === "settings") {
      setSelectedElement("General");
    }
  }, [type]);

  return (
    <div className="rightMenuContainer">
      {type === "friends" && (
        <>
          <div
            className={
              selectedElement === "My friends"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            My friends
          </div>
          <div
            className={
              selectedElement === "Friend requests"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            Friend requests
          </div>
          <div
            className={
              selectedElement === "Find friends"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            Find friends
          </div>
        </>
      )}
      {type === "homepage" && (
        <>
          <div
            className={
              selectedElement === "News"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            News
          </div>
          <div
            className={
              selectedElement === "Recommended"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            Recommended
          </div>
          <Link to={`/search`}>
            <div
              className={
                selectedElement === "Search"
                  ? "rightMenuElement active"
                  : "rightMenuElement"
              }
              onClick={(e) => selectElement(e.target)}
            >
              Search
            </div>
          </Link>
        </>
      )}
      {type === "search" && (
        <>
          <div
            className={
              selectedElement === "All"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            All
          </div>
          <div
            className={
              selectedElement === "People"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            People
          </div>
          <div
            className={
              selectedElement === "Posts"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            Posts
          </div>
        </>
      )}
      {type === "messenger" && (
        <>
          <div
            className={
              selectedElement === "All chats"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            All chats
          </div>
          <div
            className={
              selectedElement === "Unread"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            Unread
          </div>
        </>
      )}
      {type === "settings" && (
        <>
          <div
            className={
              selectedElement === "General"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            General
          </div>
          <div
            className={
              selectedElement === "Personal"
                ? "rightMenuElement active"
                : "rightMenuElement"
            }
            onClick={(e) => selectElement(e.target)}
          >
            Personal
          </div>
        </>
      )}
    </div>
  );
};

export default RightMenu;
