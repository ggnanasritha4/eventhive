import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../styles/AdminEvents.css";


function AdminEvents() {

  const requiredStyle = {
    color: "red",
    fontWeight: "bold"
  };


  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");



  useEffect(() => {
    fetchEvents();
  }, []);



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



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {

        await axios.put(
          `http://https://eventhive-r7w1.onrender.com/api/events/${editingId}`,
          formData
        );

        alert("Event updated successfully");


      } else {


        await axios.post(
          "http://https://eventhive-r7w1.onrender.com/api/events",
          formData
        );

        alert("Event added successfully");

      }



      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: "",
      });


      setEditingId(null);

      fetchEvents();



    } catch (error) {

      console.log(error);

      alert("Operation failed");

    }

  };



  const editEvent = (event) => {

    setEditingId(event._id);


    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      capacity: event.capacity,
    });


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };



  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );


    if (!confirmDelete) return;



    try {

      await axios.delete(
        `https://eventhive-r7w1.onrender.com/api/events/${id}`
      );


      alert("Event deleted successfully");

      fetchEvents();



    } catch (error) {

      console.log(error);

      alert("Delete failed");

    }

  };



  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase()
      .includes(searchTerm.toLowerCase())

    ||

    event.location?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );



  return (

    <div className="admin-events-container">


      <h1>
        Manage Events
      </h1>



      



      <form
        className="event-form"
        onSubmit={handleSubmit}
      >


        <label>
          Event Title <span style={requiredStyle}>*</span>
        </label>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />



        <label>
          Description <span style={requiredStyle}>*</span>
        </label>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />



        <label>
          Date <span style={requiredStyle}>*</span>
        </label>

        <input
          type="text"
          name="date"
          placeholder="DD-MM-YYYY"
          value={formData.date}
          onChange={handleChange}
          required
        />



        <label>
          Location <span style={requiredStyle}>*</span>
        </label>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />



        <label>
          Capacity <span style={requiredStyle}>*</span>
        </label>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />



        <button type="submit">

          {editingId ? "Update Event" : "Add Event"}

        </button>


      </form>





      <input

        type="text"

        placeholder="Search events by title or location..."

        value={searchTerm}

        onChange={(e) => setSearchTerm(e.target.value)}

        className="search-box"

      />





      <table className="events-table">

        <thead>

          <tr>

            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Actions</th>

          </tr>

        </thead>



        <tbody>

          {filteredEvents.map((event)=>(

            <tr key={event._id}>


              <td>{event.title}</td>

              <td>{event.date}</td>

              <td>{event.location}</td>

              <td>{event.capacity}</td>



              <td>


                <button
                  className="edit-btn"
                  onClick={() => editEvent(event)}
                  title="Edit Event"
                >
                  <FaEdit />
                </button>



                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event._id)}
                  title="Delete Event"
                >
                  <FaTrash />
                </button>



              </td>


            </tr>

          ))}


        </tbody>


      </table>



    </div>

  );

}


export default AdminEvents;