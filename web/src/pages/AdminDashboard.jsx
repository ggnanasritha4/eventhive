import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      alert("Please login as Admin.");
      navigate("/admin-login");
    }

  }, [navigate]);

  return (

    <div className="admin-dashboard-container">

      <h1>Admin Dashboard</h1>

      <p>Welcome to EventHive Admin Panel</p>

      <div className="dashboard-actions">

        <Link to="/admin-events">
          <button>
            Manage Events
          </button>
        </Link>

        <Link to="/admin-registrations">
          <button>
            View Registrations
          </button>
        </Link>

      </div>

    </div>

  );
}

export default AdminDashboard;