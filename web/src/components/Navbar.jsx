import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = localStorage.getItem("admin");

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("admin");

    alert("Logged out successfully.");

    navigate("/");

    window.location.reload();

  };

  return (

    <nav className="navbar">

      <div className="navbar-logo">
        EventHive
      </div>

      <div className="navbar-links">

        {/* =====================
            ADMIN NAVBAR
        ====================== */}

        {admin ? (

          <>

            <Link to="/">
              Home
            </Link>

            <Link to="/admin-dashboard">
              Admin Dashboard
            </Link>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        ) : user ? (

          /* =====================
              USER NAVBAR
          ====================== */

          <>

            <Link to="/">
              Home
            </Link>

            <Link to="/events">
              Events
            </Link>

            <Link to="/user-dashboard">
              My Dashboard
            </Link>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        ) : (

          /* =====================
              PUBLIC NAVBAR
          ====================== */

          <>

            <Link to="/">
              Home
            </Link>

            <Link to="/events">
              Events
            </Link>

            <Link to="/login">
              Login
            </Link>

            <Link to="/admin-login">
              Admin
            </Link>

          </>

        )}

      </div>

    </nav>

  );

}

export default Navbar;