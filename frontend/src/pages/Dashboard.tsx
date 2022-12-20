import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutItem from "../components/WorkoutItem";
import Spinner from "../components/Spinner";
import { getWorkouts, reset } from "../features/workouts/workoutSlice";
import { RootState } from "../app/store";
import { Container, Row } from "react-bootstrap";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { workouts, isLoading, isError, message } = useSelector(
    (state: RootState) => state.workouts
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getWorkouts());
    () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Container className="my-4">
        <h1>Welcome {user && user.name}!</h1>
        <h5>Workouts Dashboard</h5>
      </Container>

      <WorkoutForm />

      <Container className="my-5">
        {workouts.length > 0 ? (
          <Row>
            {workouts.map((workout) => (
              <WorkoutItem key={workout._id} workout={workout} />
            ))}
          </Row>
        ) : (
          <Row>
            <h3>You have not set any workouts</h3>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Dashboard;
