import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import { Link } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else if (password.current.value.length < 6) {
      password.current.setCustomValidity("Password is too short");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="login">
      <Topbar />
      <div className="loginWrapper">
        <div className="loginContainer">
          <form className="loginBox" onSubmit={handleClick}>
            <h3>Sign in to VK</h3>
            <input
              placeholder="Username"
              ref={username}
              required
              className="loginInput"
            />
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
            <input
              placeholder="Password Again"
              type="password"
              required
              ref={passwordAgain}
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
