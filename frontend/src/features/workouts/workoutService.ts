import useEffect from "react";
import axios from "axios";
import { Exercise } from "../types";

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
// Get workout with workoutId
const getWorkout = async (workoutId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + workoutId, config);
  return response.data;
};
// Delete user workout
const deleteWorkout = async (workoutId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + workoutId, config);
  return response.data;
};

// EXERCISES
const createExercise = async (
  exerciseData: Exercise,
  workoutId: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + workoutId + "/exercises",
    exerciseData,
    config
  );
  return response.data;
};
const deleteExercise = async (
  exerciseId: string,
  workoutId: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + workoutId + "/exercises/" + exerciseId,
    config
  );
  // console.log(workoutId, exerciseIdx, token, "here");
  return response.data;
};

const workoutService = {
  createWorkout,
  getWorkouts,
  deleteWorkout,
  getWorkout,
  createExercise,
  deleteExercise,
};

export default workoutService;
