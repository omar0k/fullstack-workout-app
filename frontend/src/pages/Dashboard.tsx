import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutItem from "../components/WorkoutItem";
import Spinner from "../components/Spinner";
import { getWorkouts, reset } from "../features/workouts/workoutSlice";
import { RootState } from "../app/store";

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
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Workouts Dashboard</p>
      </section>

      <WorkoutForm />

      <section className="content">
        {workouts.length > 0 ? (
          <div className="workouts">
            {workouts.map((workout) => (
              <WorkoutItem key={workout._id} workout={workout} />
            ))}
          </div>
        ) : (
          <h3>You have not set any workouts</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
