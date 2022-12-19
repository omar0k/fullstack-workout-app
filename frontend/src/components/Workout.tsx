import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExercise,
  getWorkouts,
  reset,
} from "../features/workouts/workoutSlice";
import { AppDispatch } from "../app/store";
import { RootState } from "../app/store";
import { useEffect } from "react";
import ExerciseForm from "./ExerciseForm";
import Spinner from "./Spinner";
import ExerciseComponent from "./Exercise";

const Workout = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { workouts, isError, isLoading, message } = useSelector(
    (state: RootState) => state.workouts
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getWorkouts());
    console.log("testing");
    () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);
  const selectedWorkout = workouts.find((workout) => workout._id === workoutId);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    selectedWorkout && (
      <>
        <div>
          <h2>{selectedWorkout.title}</h2>
          <ExerciseForm />
          <ul className="exercsies-list">
            {selectedWorkout.exercises.map((exercise) => (
              <li key={exercise._id}>
                <ExerciseComponent exercise={exercise} />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  );
};

export default Workout;
