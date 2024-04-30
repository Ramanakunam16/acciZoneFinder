import React from "react";
import logo from "../logo2.png";
import { Link } from "react-router-dom";
import Banner from "./Banner";

function Dashboard() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="welcome">Welcome ramana</div>
        <div className="nav-bar">
          <ul>
            <Link to="/" className="nav">
              <li>Home</li>
            </Link>
            <Link to="/about" className="nav">
              <li>Map</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="banner">
        {/* <img src={webName} alt="web name" className="bannerlogo hidden" /> */}
        <h2>AcciZoneFinder</h2>
        <p className="slogan hidden">
          Discover the Unexpected - Navigate with Confidence!"
        </p>
        <div className="button">
          <Link to="/map" className="button">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
