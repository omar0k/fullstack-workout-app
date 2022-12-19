import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";
// Register user;
const register = async (userData: object) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout

const logout = () => {
  localStorage.removeItem("user");
};
// Login

const login = async (userData: object) => {
  const response = await axios.post(API_URL + "login", userData);
  // console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const authService = {
  register,
  logout,
  login,
};

export default authService;
