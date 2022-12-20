import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts, reset } from "../features/workouts/workoutSlice";
import { AppDispatch } from "../app/store";
import { RootState } from "../app/store";
import { useEffect } from "react";
import ExerciseForm from "./ExerciseForm";
import Spinner from "./Spinner";
import ExerciseComponent from "./Exercise";
import { Container, ListGroup, Row, Col } from "react-bootstrap";

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
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mt-3 text-red">
              {selectedWorkout.title}
            </h2>
            <ExerciseForm />
            <ListGroup>
              {selectedWorkout.exercises.map((exercise) => (
                <ListGroup.Item key={exercise._id}>
                  <ExerciseComponent exercise={exercise} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default Workout;
