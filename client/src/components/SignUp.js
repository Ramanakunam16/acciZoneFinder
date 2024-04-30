import React, { useRef, useState } from "react";
import mapImg from "../map-img.jpg";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const [error, setError] = useState();
  const nameInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const passwordInput = useRef();
  const passwdConfirmInput = useRef();
  const navigate = useNavigate();
  async function handleClick(e) {
    e.preventDefault();

    try {
      const formData = {
        name: nameInput.current.value,
        email: emailInput.current.value,
        phone: phoneInput.current.value,
        passwd: passwordInput.current.value,
      };
      const { data: res } = await axios.post(
        "https://acci-zone-finder-api.vercel.app/api/users",
        formData
      );
      navigate("/login");
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
          Signup to <h2>AcciZoneFinder</h2>
        </p>
        {error && <div className="error_msg">{error}</div>}
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          placeholder="Enter Full Name"
          id="name"
          name="name"
          ref={nameInput}
        />
        <label htmlFor="email">Email Id:</label>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          name="email"
          ref={emailInput}
        ></input>
        <label htmlFor="mobileNo">Phone:</label>
        <input
          type="integer"
          placeholder="Enter Phone Number"
          id="mobileNo"
          name="mobileNo"
          ref={phoneInput}
        ></input>
        <label htmlFor="createPasswd">Create Password:</label>
        <input
          type="text"
          placeholder="Create Password"
          id="createPasswd"
          name="CreatePasswd"
          ref={passwordInput}
        ></input>
        <label htmlFor="confirmPasswd">Confirm Password</label>
        <input
          type="confirmPasswd"
          placeholder="Confirm Password"
          id="confirmPasswd"
          name="confirmPasswd"
          ref={passwdConfirmInput}
        ></input>
        <div className="button">
          <button onClick={(e) => handleClick(e)}> sign Up</button>
        </div>
        <div className="loginAcct">
          <p>
            ALraedy have an account? <Link to="/login">Log in.</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
