import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { ExercisesList } from "../assets/ExercisesList";
const Exercises = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { workoutId } = useParams<{ workoutId: string }>();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  const onSelect = () => {
    if (!workoutId) {
      return;
    }
    
  };
  return (
    <Container className="mt-4">
      <h3 className="text-center text-dark mb-3">Exercises list</h3>
      <Row className="justify-content-center">
        {ExercisesList.map((exercise) => {
          return (
            <Col
              onClick={onSelect}
              xs={12}
              md={6}
              lg={3}
              style={{
                border: "1px solid lightgray",
                borderRadius: "5px",
                margin: "5px",
              }}
            >
              <h3>{exercise.name}</h3>
              <p>{exercise.description}</p>
              <img src={exercise.image} width="200" height="200" alt="" />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Exercises;
