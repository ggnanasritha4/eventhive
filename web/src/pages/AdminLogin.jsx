import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";


function AdminLogin() {

  const navigate = useNavigate();


  const requiredStyle = {
    color: "red",
    fontWeight: "bold"
  };


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  const handleLogin = (e) => {

    e.preventDefault();



    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {


      const admin = {

        email: email,
        role: "admin",

      };



      localStorage.setItem(
        "admin",
        JSON.stringify(admin)
      );



      alert("Admin login successful!");



      navigate("/admin-dashboard");

      window.location.reload();



    } 
    else {

      alert("Invalid admin email or password");

    }

  };





  return (


    <div className="admin-login-container">


      <div className="admin-login-card">



        <h1>
          EventHive
        </h1>



        <h2>
          Admin Login
        </h2>




        <form onSubmit={handleLogin}>



          <label>
            Admin Email <span style={requiredStyle}>*</span>
          </label>



          <input

            type="email"

            placeholder="Admin Email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            required

          />





          <label>
            Password <span style={requiredStyle}>*</span>
          </label>



          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

            required

          />





          <button type="submit">

            Login

          </button>




        </form>



      </div>


    </div>


  );

}


export default AdminLogin;