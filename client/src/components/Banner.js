import React from "react";
import webName from "../acciLogo.png";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner">
      {/* <img src={webName} alt="web name" className="bannerlogo hidden" /> */}
      <h2>AcciZoneFinder</h2>
      <p className="slogan hidden">
        Discover the Unexpected - Navigate with Confidence!"
      </p>
      <div className="button">
        <Link to="/signup" className="button">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
