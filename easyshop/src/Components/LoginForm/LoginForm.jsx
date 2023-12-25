import React, { useState } from "react";
import Logo from "../Logo/Logo";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
  
    console.log("handlesubmit Login Called");
    try {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          // expiresInMins: 60, // optional
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.token) {
            localStorage.setItem("auth", JSON.stringify(data));
            navigate("/home");
          } else {
            // Handle unsuccessful login
            console.error("Login failed:", data);
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div>
      <div className="login-container">
        <form method="post" onSubmit={handleSubmit}>
          <Logo />
          <br />
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
