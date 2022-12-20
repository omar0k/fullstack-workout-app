import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { WorkoutType } from "../features/types";
import { deleteWorkout } from "../features/workouts/workoutSlice";

const workoutItem = ({ workout }: { workout: WorkoutType }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteWorkout(workout._id));
  };
  return (
    <Card bg="dark" className="my-1">
      <Card.Body>
        <Link to={`workouts/${workout._id}`}>
          <h2>{workout.title}</h2>
        </Link>
        <Button variant="danger" onClick={handleDelete}>
          Delete workout
        </Button>
        {/* <p>{new Date(workout.createdAt).toLocaleString("en-US")}</p> */}
      </Card.Body>
    </Card>
  );
};

export default workoutItem;
