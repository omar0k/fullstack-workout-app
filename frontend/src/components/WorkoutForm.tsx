import { useState, useEffect } from "react";
import { Button, Container, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { AppDispatch, RootState } from "../app/store";
import { createWorkout, reset } from "../features/workouts/workoutSlice";
import { toast } from "react-toastify";
const WorkoutForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createWorkout({ title }));
    setTitle("");
  };

  const [title, setTitle] = useState("");
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          {/* <Form.Label htmlFor="title"></Form.Label> */}
          <FormControl
            placeholder="Enter workout title"
            type="text"
            name="title"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Create Workout
        </Button>
      </Form>
    </Container>
  );
};
export default WorkoutForm;
function useEFfect(arg0: () => void, arg1: (string | boolean)[]) {
  throw new Error("Function not implemented.");
}
