import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { deleteWorkout} from "../features/workouts/workoutSlice";
type Workout = {
  _id: string;
  user: string;
  title: string;
  exercises: [];
  createdAt: Date;
  updatedAt: Date;
};
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
