import React, { useRef, useState } from "react";
import mapImg from "../map-img.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [error, setError] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();
  async function handleClick(e) {
    e.preventDefault();
    try {
      const formData = {
        email: emailInput.current.value,

        passwd: passwordInput.current.value,
      };
      const { data: res } = await axios.post(
        "https://acci-zone-finder-api.vercel.app/api/auth",
        formData
      );
      localStorage.setItem("token", res.data);
      window.location = "/dashboard";
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  }

  return (
    <div className="signup">
      <div className="map-img">
        <img src={mapImg}></img>
      </div>
      <form className="form">
        <p>
          Login to <h2>AcciZoneFinder</h2>
        </p>
        {error && <div className="error_msg">{error}</div>}
        <label htmlFor="email">Email Id:</label>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          name="email"
          ref={emailInput}
        ></input>

        <label htmlFor="createPasswd">Password:</label>
        <input
          type="password"
          placeholder="Password"
          id="createPasswd"
          name="CreatePasswd"
          ref={passwordInput}
        ></input>

        <div className="button">
          <button onClick={(e) => handleClick(e)}> login</button>
        </div>
        <div className="loginAcct">
          <p>
            Don't have an account? <Link to="/signup"> Sign up.</Link>
          </p>
          <p>Forgot your password?</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
