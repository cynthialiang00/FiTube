import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";

import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const handleLogIn = (e) => {
    e.preventDefault();
    return history.push({
        pathname: "/login",
        state: { goBackURL: history.location.pathname }
        });
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    return history.push({
      pathname: "/signup",
      state: { goBackURL: history.location.pathname }
    });
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="nav-avatar-btn" onClick={openMenu}>
        { user ?
          <img src={user.avatar} alt="user avatar"></img>
          :
          <i className="fas fa-user-circle" style={{fontSize: "20px", color: "#f1f1f1"}}/>
        }
        
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>
              <NavLink className="profile-user" to={`/channels/${user.id}`}>
              <img src={user.avatar} alt="user avatar"></img>
              <div>

                <div id="profile-username">
                  {user.username.length > 15 ? 
                  `${user.username.substring(0,15)}...`
                  :
                    user.username
                  }
                </div>
                <div id="profile-email">
                  {user.email.length > 15 ?
                    `${user.email.substring(0, 15)}...`
                    :
                    user.email
                  }
                </div>
                
              </div>
              </NavLink>
            </li>
            
            <li>
              <NavLink to="/manage">
                Manage Videos
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <button onClick={handleLogIn}>Log In</button>

            <button onClick={handleSignUp}>Sign Up</button>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
