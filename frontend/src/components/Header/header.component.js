import React from "react";

import "./header.styles.css";

const Header = () => {
  return (
    <header>
      <div className="navbar">
        <div>
          <a className="home-link" href="/">
            ProShop
          </a>
        </div>
        <div>
          <ul className="sub-links">
            <li>
              <a href="/profile">
                <i class="fas fa-user"></i>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="/cart">
                <i class="fas fa-cart-plus"></i>
                <span>Cart</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
