import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Register.css";


function Register() {

  const requiredStyle = {
    color: "red",
    fontWeight: "bold"
  };


  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
  });



  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }


    setFormData((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
    }));


  }, [navigate]);




  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    const registrationData = {
      eventId: id,
      ...formData,
    };



    try {


      const response = await fetch(
        "http://https://eventhive-r7w1.onrender.com/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );



      const data = await response.json();



      if (response.ok) {

        alert("Registration Successful!");

        navigate("/user-dashboard");


      } else {


        if (
          data.message &&
          data.message.includes("already registered")
        ) {

          alert("You have already registered for this event.");

        } else {

          alert(data.message || "Registration Failed");

        }

      }



    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  };





  return (

    <div className="register-container">

      <div className="register-card">


        <h1>
          Event Registration
        </h1>



        <form onSubmit={handleSubmit}>


          <label>
            Name <span style={requiredStyle}>*</span>
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
          />




          <label>
            Roll No <span style={requiredStyle}>*</span>
          </label>

          <input
            type="text"
            name="rollNo"
            placeholder="Enter roll number"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />





          <label>
            Email <span style={requiredStyle}>*</span>
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />





          <label>
            Phone Number <span style={requiredStyle}>*</span>
          </label>

          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />





          <label>
            Branch <span style={requiredStyle}>*</span>
          </label>

          <input
            type="text"
            name="branch"
            placeholder="Enter branch"
            value={formData.branch}
            onChange={handleChange}
            required
          />





          <label>
            Year <span style={requiredStyle}>*</span>
          </label>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Year
            </option>

            <option value="1st Year">
              1st Year
            </option>

            <option value="2nd Year">
              2nd Year
            </option>

            <option value="3rd Year">
              3rd Year
            </option>

            <option value="4th Year">
              4th Year
            </option>

          </select>





          <button type="submit">
            Register
          </button>



        </form>


      </div>

    </div>

  );

}


export default Register;