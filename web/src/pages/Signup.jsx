import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";
import "../styles/Signup.css";


function Signup() {

  const navigate = useNavigate();


  const requiredStyle = {
    color: "red",
    fontWeight: "bold"
  };


  const [user, setUser] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: "",

  });


  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setUser({

      ...user,
      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();



    if (
      !user.name.trim() ||
      !user.email.trim() ||
      !user.password ||
      !user.confirmPassword
    ) {

      alert("Please fill all fields.");
      return;

    }




    if (user.password.length < 6) {

      alert("Password must be at least 6 characters.");
      return;

    }




    if (user.password !== user.confirmPassword) {

      alert("Passwords do not match.");
      return;

    }




    try {

      setLoading(true);



      const response = await registerUser({

        name: user.name,
        email: user.email,
        password: user.password,

      });




      alert(response.data.message);




      setUser({

        name: "",
        email: "",
        password: "",
        confirmPassword: "",

      });



      navigate("/login");



    } 
    catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed."
      );

    }
    finally {

      setLoading(false);

    }

  };






  return (

    <div className="signup-container">


      <div className="signup-card">



        <h1>
          EventHive
        </h1>



        <h2>
          Create Account
        </h2>




        <form onSubmit={handleSubmit}>



          <label>
            Full Name <span style={requiredStyle}>*</span>
          </label>


          <input

            type="text"

            name="name"

            placeholder="Full Name"

            value={user.name}

            onChange={handleChange}

            required

          />





          <label>
            Email Address <span style={requiredStyle}>*</span>
          </label>


          <input

            type="email"

            name="email"

            placeholder="Email Address"

            value={user.email}

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

            value={user.password}

            onChange={handleChange}

            required

          />






          <label>
            Confirm Password <span style={requiredStyle}>*</span>
          </label>


          <input

            type="password"

            name="confirmPassword"

            placeholder="Confirm Password"

            value={user.confirmPassword}

            onChange={handleChange}

            required

          />






          <button type="submit">

            {loading ? "Creating Account..." : "Create Account"}

          </button>




        </form>





        <p>

          Already have an account?{" "}


          <Link to="/login">

            Login

          </Link>


        </p>




      </div>


    </div>

  );

}


export default Signup;