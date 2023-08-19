import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const result = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("jwt_token", result.data.token);
      navigate("/Homepage");
    } catch (error) {
      console.error(
        "An error occurred during login:",
        error.response.data.message
      );
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  return (
    <div className="signin_container">
      <img
        className="sidenav__logo"
        src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
        alt="Instagram Logo"
      />
      <div>
        <h2>Sign In</h2>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="signin_signup">
        <div>
          <button onClick={submit}>Sign In</button>
        </div>
        <div>
          <button onClick={signUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
