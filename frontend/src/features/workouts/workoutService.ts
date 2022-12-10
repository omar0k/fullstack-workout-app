import useEffect from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts/";

const createWorkout = async (workoutData: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, workoutData, config);
  return response.data;
};
const getWorkouts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const workoutService = {
  createWorkout,
  getWorkouts,
};

export default workoutService;
