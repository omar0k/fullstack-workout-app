import { Col, Container, Row } from "react-bootstrap";
import { ExercisesList } from "../assets/ExercisesList";
const Exercises = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        {ExercisesList.map((exercise) => {
          return (
            <Col
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
