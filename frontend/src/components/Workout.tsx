import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkout, getWorkouts } from "../features/workouts/workoutSlice";
import { AppDispatch } from "../app/store";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { WorkoutsState, WorkoutType } from "../features/types";
const Workout = () => {
  const workoutId = useParams<{ workoutId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { currentWorkout } = useSelector((state: RootState) => state.workouts);
  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getWorkout(workoutId.workoutId));
  }, [dispatch, workoutId]);
  console.log(currentWorkout.exercises);
  return (
    <div>
      {currentWorkout &&
      currentWorkout.exercises &&
      currentWorkout.exercises.length > 0 ? (
        <ul>
          {currentWorkout.exercises.map((exercise) => (
            <li key={exercise.id}>{exercise.name}</li>
          ))}
        </ul>
      ) : (
        <p>No exercises found for this workout</p>
      )}
    </div>
  );
};

export default Workout;
