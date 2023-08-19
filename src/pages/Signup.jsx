import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const submit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData
      );
      if (result.data.message === "User created successfully") {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const goToSignIn = () => {
    navigate("/");
  };

  return (
    <div className="signup_container">
      <img
        className="sidenav__logo"
        src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
        alt="Instagram Logo"
      />
      <div>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className="signin_signup">
        <div>
          <button onClick={goToSignIn}>Back</button>
        </div>
        <div>
          <button onClick={submit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
