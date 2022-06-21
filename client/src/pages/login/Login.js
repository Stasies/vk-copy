import "./login.css";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <Topbar />
      <div className="loginWrapper">
        <div className="loginContainer">
          <form
            className="loginBox"
            style={{ height: "35vh" }}
            onSubmit={handleClick}
          >
            <h3>Sign in to VK</h3>
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              minLength="6"
            />
            <input
              placeholder="Password"
              type="password"
              required
              ref={password}
              className="loginInput"
            />
            <button type="submit" className="loginRegisterButton">
              Log into Account
            </button>
            <Link to="/register">
              <button className="loginButton">Register</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
