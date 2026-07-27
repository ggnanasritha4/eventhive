import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {

  return (

    <div className="home">

      <section className="hero">

        <h1>EventHive</h1>

        <p>
          Discover and register for exciting college events with ease.
        </p>

        <Link to="/events">
          <button className="hero-btn">
            Explore Events
          </button>
        </Link>

      </section>

      <section className="about">

        <h2>Our Features</h2>

        <div className="feature-container">

          <div className="feature-card">

            <h3>Event Registration</h3>

            <p>
              Register for your favorite college events quickly and easily through a simple online registration form.
            </p>

          </div>

          <div className="feature-card">

            <h3>Event Information</h3>

            <p>
              Explore upcoming events with complete details, including the date, venue, and event description.
            </p>

          </div>

          <div className="feature-card">

            <h3>View Registrations</h3>

            <p>
              View all your registered events in one place and keep track of your participation.
            </p>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Home;