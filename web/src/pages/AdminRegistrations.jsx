import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaTrash } from "react-icons/fa";
import "../styles/AdminRegistrations.css";

function AdminRegistrations() {

  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    fetchRegistrations();
    fetchEvents();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(
        "http://https://eventhive-r7w1.onrender.com/api/registrations"
      );

      setRegistrations(response.data);
      setFilteredRegistrations(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://https://eventhive-r7w1.onrender.com/api/events"
      );

      setEvents(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteRegistration = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://eventhive-r7w1.onrender.com/api/registrations/${id}`
      );

      alert("Registration deleted successfully");

      fetchRegistrations();

    } catch (error) {

      console.log(error);

      alert("Delete failed");

    }
  };

  const handleFilter = (e) => {

    const value = e.target.value;

    setSelectedEvent(value);

    if (value === "") {

      setFilteredRegistrations(registrations);

    } else {

      const filtered = registrations.filter(
        (reg) => reg.eventId?._id === value
      );

      setFilteredRegistrations(filtered);
    }
  };

  const generatePDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("EventHive Registration Report", 14, 18);

    doc.setFontSize(11);
    doc.text(
      `Generated On: ${new Date().toLocaleString()}`,
      14,
      28
    );

    autoTable(doc, {
      startY: 35,

      head: [[
        "Name",
        "Roll No",
        "Email",
        "Phone",
        "Event",
        "Branch",
        "Year"
      ]],

      body: filteredRegistrations.map((reg) => [
        reg.name,
        reg.rollNo,
        reg.email,
        reg.phone,
        reg.eventId?.title,
        reg.branch,
        reg.year
      ]),
    });

    doc.save("EventHive_Registrations.pdf");
  };

  return (
    <div className="admin-registrations-container">

      <h1>Manage Registrations</h1>

      

      <div className="registration-controls">

        <select
          value={selectedEvent}
          onChange={handleFilter}
        >
          <option value="">All Events</option>

          {events.map((event) => (
            <option
              key={event._id}
              value={event._id}
            >
              {event.title}
            </option>
          ))}
        </select>

        <button onClick={fetchRegistrations}>
          Refresh
        </button>

        <button onClick={generatePDF}>
          Generate PDF
        </button>

        <strong className="registration-count">
          Total: {filteredRegistrations.length}
        </strong>

      </div>

      <table className="registrations-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Event</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredRegistrations.map((reg) => (

            <tr key={reg._id}>

              <td>{reg.name}</td>

              <td className="roll-column">
                {reg.rollNo}
              </td>

              <td>{reg.email}</td>

              <td>{reg.phone}</td>

              <td>{reg.eventId?.title}</td>

              <td>{reg.branch}</td>

              <td>{reg.year}</td>

              <td>
                {reg.eventId?.date
                  ? new Date(reg.eventId.date).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteRegistration(reg._id)}
                  title="Delete Registration"
                >
                  <FaTrash />
                </button>
              </td>

            </tr>

          ))}

          {filteredRegistrations.length === 0 && (
            <tr>
              <td colSpan="9" align="center">
                No registrations found.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default AdminRegistrations;