import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
  };

  return (
    <div className="container-fluid" style={{ padding: "0 15px" }}>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
        style={{
          padding: "15px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link to="/">
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
        
      </nav>
    </div>
  );
};

export default Navbar;
