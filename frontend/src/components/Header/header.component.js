import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

const Header = () => {
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
                <i class="fas fa-cart-plus"></i>
                <span>Cart</span>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <i class="fas fa-user"></i>
                <span>SignIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
