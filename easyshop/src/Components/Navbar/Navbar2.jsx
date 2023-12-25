// Navbar2.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Home from "../Home/Home";

import "./Navbar.css";

const Navbar2 = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
  };

  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0); // State for cart count
  const [cartData, setCartData] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");

  console.log(maxPrice,minPrice,"kkk")

  useEffect(() => {
    // Fetch user details from localStorage
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setUsername(authData.username);
    }
  }, []);

  // Update the cart count based on the items in the cart
  const updateCartCount = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));

      // Fetch the cart data for the user with the specified ID
      const response = await fetch(
        `https://dummyjson.com/carts/user/${authData.id}`
      );
      const data = await response.json();

      // Assuming there's only one cart for a user
      const count = data.carts[0]?.products?.length || 0;
      setCartCount(count);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    // Update cart count on component mount
    updateCartCount();
  }, [searchQuery]);

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
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          {/* New range input for price */}
          <div style={{ marginLeft: "20px", float: "left", display: "inline-flex" }}>
            <label htmlFor="priceRange" style={{ marginRight: "10px" }}>Price Range:</label>
            <input
              type="range"
              id="priceRange"
              min="0"
              max="5000" // Set the maximum value based on your product price range
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>${maxPrice}</span>
          </div>

          <div className="navbar-text" style={{ marginLeft: "100px" }}>
            {username ? (
              <>
                <Link to="/cart" style={{ position: "relative" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="44"
                    fill="currentColor"
                    class="bi bi-cart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  {cartCount > 0 && (
                    <span
                      className="badge badge-danger"
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        fontSize: "22px",
                        color: "red",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
                <span style={{ marginRight: "10px", marginLeft: "50px" }}>
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
      <Home searchQuery={searchQuery} maxPrice={maxPrice} minPrice={minPrice} />
    </div>
  );
};

export default Navbar2;
