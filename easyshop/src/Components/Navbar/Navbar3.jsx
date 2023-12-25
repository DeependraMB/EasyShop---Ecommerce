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
          {/* ... (menu items) */}
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ width: "300px", marginLeft: "20px" }}
            value={searchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value)}}
          />
         

          <div className="navbar-text" style={{ marginLeft: "20px" }}>
            {username ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
                <span style={{ marginRight: "10px" }}>
                  Welcome, {username}!
                </span>
                <button
                  className="btn btn-outline-success"
                  onClick={handleLogout}
                >
                  Logout
                </button>
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
