import Home from "./pages/home/Home";
import Profile from "./pages/profile/Index";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import Messenger from "./pages/messenger/Messenger";
import Friends from "./pages/friends/Friends";
import Search from "./pages/search/Search";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />
        <Route
          path="/settings"
          element={
            user ? (
              <Settings username={user.username} />
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/register" replace />}
        />
        <Route
          path="/friends"
          element={
            user ? <Friends user={user} /> : <Navigate to="/register" replace />
          }
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/register" replace />}
        />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/register" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
