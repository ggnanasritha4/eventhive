import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";

function UserDashboard() {

  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://https://eventhive-r7w1.onrender.com/api/registrations/user/${user.email}`
      );

      setRegistrations(response.data);

    } catch (error) {
      console.log("Failed to fetch registrations:", error);
    }
  };

  return (

    <div className="user-dashboard-container">

      <h1>User Dashboard</h1>

      <p>Welcome to EventHive</p>

      <div className="user-dashboard-content">

        <h2>My Registrations</h2>

        {registrations.length === 0 ? (

          <p>No registrations found.</p>

        ) : (

          registrations.map((registration) => (

            <div
              className="registration-card"
              key={registration._id}
            >

              <h3>{registration.eventId?.title}</h3>

              <p>
                <strong>Date:</strong>{" "}
                {registration.eventId?.date
                  ? new Date(registration.eventId.date).toLocaleDateString()
                  : "-"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {registration.eventId?.location}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {registration.name}
              </p>

              <p>
                <strong>Roll No:</strong>{" "}
                {registration.rollNo}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {registration.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {registration.phone}
              </p>

              <p>
                <strong>Branch:</strong>{" "}
                {registration.branch}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {registration.year}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default UserDashboard;