import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../redux/user/user.actions";

import "./header.styles.css";

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const { userInfo } = useSelector(state => state.userLogin);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className="navbar">
        <div>
          <Link className="home-link" to="/">
            ProShop
          </Link>
        </div>
        <div>
          <ul className="sub-links">
            <li>
              <Link to="/cart">
                <i className="fas fa-cart-plus"></i>
                <span>Cart</span>
              </Link>
            </li>
            <li>
              {userInfo ? (
                <div className="drop-down">
                  <span
                    className="drop-down-title"
                    onClick={() => setDropDown(!dropDown)}
                  >
                    {userInfo.name} <i className="fas fa-caret-down"></i>
                  </span>
                  {dropDown ? (
                    <div className="drop-down-box">
                      <span className="drop-down-item">
                        <Link
                          onClick={() => setDropDown(!dropDown)}
                          to="/profile"
                        >
                          Profile
                        </Link>
                      </span>

                      <div onClick={logoutHandler} className="drop-down-item">
                        Logout
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <i className="fas fa-user"></i>
                  <span>SignIn</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
