import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Events.css";


function Events() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetch("https://eventhive-r7w1.onrender.com/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching events:", error);
        setLoading(false);
      });

  }, []);


  if (loading) {
    return <h2>Loading events...</h2>;
  }


  return (
    <div className="events-page">

      <h1>Available Events</h1>


      <div className="events-container">

        {events.map((event) => (

          <div className="event-card" key={event._id}>

            <h2>{event.title}</h2>

            <p>{event.description}</p>

            <p>
              <strong>Date:</strong> {event.date}
            </p>

            <p>
              <strong>Location:</strong> {event.location}
            </p>

            <p>
              <strong>Capacity:</strong> {event.capacity}
            </p>


            <Link to={`/register/${event._id}`}>
              <button>
                Register Now
              </button>
            </Link>


          </div>

        ))}

      </div>

    </div>
  );
}

export default Events;