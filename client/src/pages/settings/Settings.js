import React, { useState, useEffect, useContext, useRef } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { AuthContext } from "../../Context/AuthContext";
import Upload from "./UploadPicture";
import { Remove } from "@material-ui/icons";
import axios from "axios";
import RightMenu from "../../components/rightMenu/RightMenu";

const Settings = ({ username }) => {
  // const [user, setUser] = useState({});
  let [file, setFile] = useState(null);
  let [user, setUser] = useState({});
  const email = useRef();
  const phone = useRef();
  const school = useRef();
  const password = useRef();
  const relationship = useRef();
  const university = useRef();
  const work = useRef();
  const city = useRef();
  const [editing, setEditing] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const setOpen = () => {
    document.getElementById("hoverSection").style.cssText = "display: flex;";
  };
  const setClosed = () => {
    document.getElementById("hoverSection").style.cssText = "display: none;";
  };
  const setOpenCover = () => {
    document.getElementById("hoverSectionCover").style.cssText =
      "display: flex;";
  };
  const setClosedCover = () => {
    document.getElementById("hoverSectionCover").style.cssText =
      "display: none;";
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const newPicture = {
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPicture.img = fileName;
      console.log(newPicture);
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.put("/" + user._id, user._id);
      document.getElementById("hoverSection").style.cssText = "display: none;";
    } catch (err) {}
  };

  const editPersonalInfo = async (edit) => {
    // setEditing(true);
    console.log(edit.current.value);
    console.log(editing);
    try {
      switch (editing) {
        case "phone":
          await axios.put(`/users/${user._id}`, {
            phone: phone.current.value,
            userId: user._id,
          });
          break;
        case "email":
          await axios.put(`/users/${user._id}`, {
            email: email.current.value,
            userId: user._id,
          });
          break;
        case "city":
          await axios.put(`/users/${user._id}`, {
            city: city.current.value,
            userId: user._id,
          });
          break;
        case "university":
          await axios.put(`/users/${user._id}`, {
            university: university.current.value,
            userId: user._id,
          });
          break;
        case "work":
          await axios.put(`/users/${user._id}`, {
            work: work.current.value,
            userId: user._id,
          });
          break;
        case "school":
          await axios.put(`/users/${user._id}`, {
            school: school.current.value,
            userId: user._id,
          });
          break;
        case "password":
          await axios.put(`/users/${user._id}`, {
            password: password.current.value,
            userId: user._id,
          });
          break;

        default:
          break;
      }
      // await axios.put(`/users/${user._id}`, {
      //   phone: phone.current.value,
      //   school: email.current.value,
      //   city: city.current.value,
      //   userId: user._id,
      // });
      setEditing(false);
      window.location.reload();
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
          <div className="allFriendsContainer">
            <div className="friendsTopNavigation">
              <div className="allFriends">
                <p>General</p>
              </div>
            </div>
            <div className="settingsOption">
              <div className="settingsOptionTitle">Password</div>
              {editing === "password" ? (
                <input
                  ref={password}
                  className="settingsOptionGiven settingsOptionInput"
                />
              ) : (
                <div className="settingsOptionGiven">Password</div>
              )}
              {editing === "password" ? (
                <div
                  className="settingsOptionChange"
                  onClick={() => editPersonalInfo("password")}
                >
                  save
                </div>
              ) : (
                <div
                  className="settingsOptionChange"
                  onClick={() => setEditing("password")}
                >
                  change
                </div>
              )}
            </div>
            <div className="settingsOption">
              <div className="settingsOptionTitle">Email</div>
              {editing === "email" ? (
                <input
                  ref={email}
                  className="settingsOptionGiven settingsOptionInput"
                  placeholder={user.email ? user.email : "Your email"}
                />
              ) : (
                <div className="settingsOptionGiven">
                  {user.email ? user.email : "Not stated"}
                </div>
              )}
              {editing === "email" ? (
                <div
                  className="settingsOptionChange"
                  onClick={() => editPersonalInfo(email)}
                >
                  save
                </div>
              ) : (
                <div
                  className="settingsOptionChange"
                  onClick={() => setEditing("email")}
                >
                  change
                </div>
              )}
            </div>
            <div className="settingsOption">
              <div className="settingsOptionTitle">Phone number</div>
              {editing === "phone" ? (
                <input
                  ref={phone}
                  className="settingsOptionGiven settingsOptionInput"
                  placeholder={user.phone ? user.phone : "Your phone"}
                />
              ) : (
                <div className="settingsOptionGiven">
                  {user.phone ? user.phone : "Not stated"}
                </div>
              )}
              {editing === "phone" ? (
                <div
                  className="settingsOptionChange"
                  onClick={() => editPersonalInfo(phone)}
                >
                  save
                </div>
              ) : (
                <div
                  className="settingsOptionChange"
                  onClick={() => setEditing("phone")}
                >
                  change
                </div>
              )}
            </div>
            <div className="settingsOption">
              <div className="settingsOptionTitle">City</div>
              {editing === "city" ? (
                <input
                  ref={city}
                  className="settingsOptionGiven settingsOptionInput"
                  placeholder={user.city ? user.city : "Your city"}
                />
              ) : (
                <div className="settingsOptionGiven">
                  {user.city ? user.city : "Not stated"}
                </div>
              )}
              {editing === "city" ? (
                <div
                  className="settingsOptionChange"
                  onClick={() => editPersonalInfo(city)}
                >
                  save
                </div>
              ) : (
                <div
                  className="settingsOptionChange"
                  onClick={() => setEditing("city")}
                >
                  change
                </div>
              )}
            </div>
            <div className="settingsOption">
              <div className="settingsOptionTitle">University</div>
              {editing === "university" ? (
                <input
                  ref={university}
                  className="settingsOptionGiven settingsOptionInput"
                  placeholder={
                    user.university ? user.university : "Your university"
                  }
                />
              ) : (
                <div className="settingsOptionGiven">
                  {user.university ? user.university : "Not stated"}
                </div>
              )}
              {editing === "university" ? (
                <div
                  className="settingsOptionChange"
                  onClick={() => editPersonalInfo(university)}
                >
                  save
                </div>
              ) : (
                <div
                  className="settingsOptionChange"
                  onClick={() => setEditing("university")}
                >
                  change
                </div>
              )}
            </div>
            <div className="settingsOption">
              <div className="settingsOptionTitle">School</div>
              {editing === "school" ? (
                <input
                  ref={school}
                  className="settingsOptionGiven settingsOptionInput"
                  placeholder={user.school ? user.school : "Your school"}
                />
              ) : (
                <div className="settingsOptionGiven">
                  {user.school ? user.school : "Not stated"}
                </div>
              )}
              {editing === "school" ? (
                <div
                  className="settingsOptionChange"
                  onClick={() => editPersonalInfo(school)}
                >
                  save
                </div>
              ) : (
                <div
                  className="settingsOptionChange"
                  onClick={() => setEditing("school")}
                >
                  change
                </div>
              )}
            </div>
            <div className="settingsOption">
              <div className="settingsOptionTitle">Work</div>
              {editing === "work" ? (
                <input
                  ref={work}
                  className="settingsOptionGiven settingsOptionInput"
                  placeholder={user.work ? user.work : "Your work"}
                />
              ) : (
                <div className="settingsOptionGiven">
                  {user.work ? user.work : "Not stated"}
                </div>
              )}
              {editing === "work" ? (
                <div
                  className="settingsOptionChange"
                  onClick={() => editPersonalInfo(work)}
                >
                  save
                </div>
              ) : (
                <div
                  className="settingsOptionChange"
                  onClick={() => setEditing("work")}
                >
                  change
                </div>
              )}
            </div>
            {/* <div className="settingsOption">
              <div className="settingsOptionTitle">Relationship</div>
              {editing === "relationship" ? (
                <input
                  ref={relationship}
                  className="settingsOptionGiven settingsOptionInput"
                  placeholder={
                    user.relationship
                      ? user.relationship
                      : "Your relationship"
                  }
                />
              ) : (
                <div className="settingsOptionGiven">
                  {user.relationship
                    ? user.relationship
                    : "Not stated"}
                </div>
              )}
              <div
                className="settingsOptionChange"
                onClick={() => setEditing("relationship")}
              >
                change
              </div>
            </div> */}
          </div>
          <RightMenu type="settings" />
        </div>
      </div>
    </>
  );
};

export default Settings;
