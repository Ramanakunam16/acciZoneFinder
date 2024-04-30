import React from "react";
import logo from "../logo2.png";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="nav-bar">
        <ul>
          <Link to="/" className="nav">
            <li>Home</li>
          </Link>
          <Link to="/about" className="nav">
            <li>About</li>
          </Link>
          <Link to="/contact" className="nav">
            <li>Contact</li>
          </Link>
          <Link to="/signup" className="login">
            <li>Login</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
