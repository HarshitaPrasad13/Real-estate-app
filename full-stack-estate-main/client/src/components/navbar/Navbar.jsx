import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import apiRequest from "../../lib/apiRequest";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser, updateUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  const navigate = useNavigate();

  if(currentUser) fetch();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
    } catch (err) {
      console.log(err);
    } finally {
      updateUser(null);
      setOpen(false);
      navigate("/");
    }
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>HPEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/" onClick={() => setOpen(false)}>About</Link>
          <Link to="/" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/" onClick={() => setOpen(false)}>Agents</Link>
          {currentUser ? (
            <>
              <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
