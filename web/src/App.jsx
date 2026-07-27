import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Register from "./pages/Register";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminRegistrations from "./pages/AdminRegistrations";


function App() {

  return (

    <BrowserRouter>

      <Navbar />


      <Routes>


        {/* PUBLIC / USER PAGES */}

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/events"
          element={<Events />}
        />


        <Route
          path="/register/:id"
          element={<Register />}
        />


        <Route
          path="/signup"
          element={<Signup />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />



        {/* ADMIN PAGES */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />


        <Route
          path="/admin-events"
          element={<AdminEvents />}
        />


        <Route
          path="/admin-registrations"
          element={<AdminRegistrations />}
        />


      </Routes>


      <Footer />


    </BrowserRouter>

  );
}


export default App;