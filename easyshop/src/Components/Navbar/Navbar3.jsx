import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

import "./Navbar.css";

const Navbar3 = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
  };

  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch user details from localStorage
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setUsername(authData.username);
    }
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ padding: "15px 15px 20px 15px", marginLeft: "10px" }}
    >
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        style={{ margin: "0 -3px", fontSize: "20px", paddingLeft: "20px" }}
      >
        <Link to="/home">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
          style={{ marginLeft: "25px" }}
        >
          

          <div className="navbar-text" style={{ marginLeft: "20px" }}>
            {username ? (
              <>
                <span
                  style={{
                    marginLeft: "550px",
                    textDecoration: "",
                    fontSize: "25px",
                    fontWeight: "600"
                  }}
                >
                  Cart

                </span>
                <span
                  style={{
                    marginLeft: "450px",
                    textDecoration: "underline",
                    fontSize: "20px",
                  }}
                >
                  Welcome,
                  <span style={{ fontWeight: "bolder", color: "" }}>
                    {username}!
                  </span>
                </span>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-success">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-outline-success ml-2">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar3;
