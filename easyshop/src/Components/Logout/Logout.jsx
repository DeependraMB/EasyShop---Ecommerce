import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ varient }) {
  const navigate = useNavigate();
  

  
  const handleLogout = () => {
 
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="container mt-7">
      <div className="mt-7">
        <button
          className={`logOut btn btn-outline-${varient} my-2 my-sm-0`}
          type="button"
          onClick={handleLogout}
          
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
