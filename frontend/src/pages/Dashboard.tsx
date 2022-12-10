import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import WorkoutForm from "../components/WorkoutForm";
import Spinner from "../components/Spinner";
import { getWorkouts, reset } from "../features/workouts/workoutSlice";
const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { workouts, isLoading, isError, message } = useSelector(
    (state: RootState) => state.workouts
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getWorkouts());
    return () => {
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
        <p>Workouts</p>
      </section>

      <WorkoutForm />
    </>
  );
};
export default Dashboard;
