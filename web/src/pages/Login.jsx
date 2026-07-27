import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";


function Login() {

  const navigate = useNavigate();


  const requiredStyle = {
    color: "red",
    fontWeight: "bold"
  };


  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });


  const [loading, setLoading] = useState(false);




  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      const response = await axios.post(
        "https://eventhive-r7w1.onrender.com/api/auth/login",
        formData
      );



      alert(response.data.message);



      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );




      if (response.data.user.role === "admin") {

        navigate("/admin-dashboard");

      } 
      else {

        navigate("/user-dashboard");

      }



    } 
    catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }
    finally {

      setLoading(false);

    }

  };





  return (

    <div className="login-container">


      <div className="login-card">



        <h1>
          EventHive
        </h1>


        <h2>
          Login
        </h2>




        <form onSubmit={handleSubmit}>



          <label>
            Email <span style={requiredStyle}>*</span>
          </label>


          <input

            type="email"

            name="email"

            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            required

          />





          <label>
            Password <span style={requiredStyle}>*</span>
          </label>


          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            required

          />






          <button type="submit">

            {loading ? "Logging in..." : "Login"}

          </button>




        </form>





        <p>

          Don't have an account?{" "}


          <Link to="/signup">

            Sign Up

          </Link>


        </p>




      </div>


    </div>

  );

}


export default Login;