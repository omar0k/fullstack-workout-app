import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import React, { useEffect, useState } from "react";
import { createExercise, getWorkouts } from "../features/workouts/workoutSlice";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from "react-bootstrap";
const ExerciseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sets: 1,
    reps: 1,
  });
  const { name, sets, reps, description } = formData;
  const { workouts } = useSelector((state: RootState) => state.workouts);
  const { workoutId } = useParams<{ workoutId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitExercise = (e: React.FormEvent) => {
    e.preventDefault();
    const exerciseData = {
      name,
      description,
      sets,
      reps,
    };
    dispatch(createExercise({ exerciseData, workoutId }));
  };
  return (
    <Container>
      <Container>
        <h1>Create Exercise</h1>
      </Container>
      <Form onSubmit={submitExercise}>
        <Form.Group>
          <FormControl
            type="text"
            className="form-control"
            id="name"
            required
            value={name}
            name="name"
            placeholder="Exercise name"
            onChange={onChange}
          />
          {/* <label htmlFor="name">Exercise Name</label> */}
          <FormControl
            type="text"
            className="form-control"
            id="description"
            value={description}
            required
            name="description"
            placeholder="Exercise description"
            onChange={onChange}
          />
          <Form.Label>Number of sets:</Form.Label>
          <FormControl
            type="number"
            className="form-control"
            id="sets"
            min={1}
            required
            max={100}
            value={sets}
            name="sets"
            placeholder="Number of sets"
            onChange={onChange}
          />
          <Form.Label>Number of reps:</Form.Label>
          <FormControl
            type="number"
            min={1}
            max={100}
            className="form-control"
            id="reps"
            value={reps}
            required
            name="reps"
            placeholder="Number of reps"
            onChange={onChange}
          />
          <Button className="btn btn-block" type="submit">
            Add exercise
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
export default ExerciseForm;
