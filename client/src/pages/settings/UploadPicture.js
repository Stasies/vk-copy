import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from "axios";
import { useParams } from "react-router";

export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-self: center;
  top: 25%;
  left: 30%;
  z-index: 200;
  width: 50%;
  height: 50%;
  background-color: red;
`;
export const Wrapper = styled.div`
  h3 {
    margin: 20px;
  }
`;
export const Form = styled.div``;
export const Button = styled.button``;

const Upload = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  let [file, setFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const username = useParams().username;

  const setImage = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      try {
        await axios.post("/upload", data);
        await axios.put("/users/" + user._id, profilePicture);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Container>
        <Wrapper>
          <h3>Change your profile picture</h3>
          <Form onSubmit={setImage}>
            <label>
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "user.png"
                }
                alt=""
              />{" "}
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.svg"
                // onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <Button>Save image</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Upload;
