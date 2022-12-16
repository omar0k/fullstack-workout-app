import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { Workout } from "../features/types";
import { deleteWorkout } from "../features/workouts/workoutSlice";

const workoutItem = ({ workout }: { workout: Workout }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteWorkout(workout._id));
  };
  return (
    <div className="workout">
      <div>{new Date(workout.createdAt).toLocaleString("en-US")}</div>
      <h2>{workout.title}</h2>
      <button onClick={handleDelete} className="close">
        X
      </button>
    </div>
  );
};

export default workoutItem;
