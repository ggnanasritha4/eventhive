import axios from "axios";

const API = axios.create({
  baseURL: "https://eventhive-r7w1.onrender.com/api/auth",
});

// User Signup
export const registerUser = async (userData) => {
  const response = await API.post("/signup", userData);
  return response;
};

// User Login
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response;
};

export default API;