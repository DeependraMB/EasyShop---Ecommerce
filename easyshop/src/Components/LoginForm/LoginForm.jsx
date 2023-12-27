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

    console.log("handlesubmit Login Called", username, password);
    try {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
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
            console.log(data);
            localStorage.setItem("auth", JSON.stringify(data));
            navigate("/home");
          } else {
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
    <div style={{ marginTop: "200px", marginBottom: "150px" }}>
      <div className="login-container">
        <form method="post">
          <center>
            <Logo />
          </center>
          <br />
          <div className="mui-input">
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
          <div className="mui-input">
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
          <button
            type="submit"
            className="btn btn-outline-dark"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div className="login-info mt-3">
            <span>
              <center>
                {" "}
                username:<strong>atuny0</strong>{" "}
              </center>

              <center>
                {" "}
                password: <strong>9uQFF1Lh</strong>
              </center>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
