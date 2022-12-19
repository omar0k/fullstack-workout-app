import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import React, { useEffect, useState } from "react";
import { createExercise, getWorkouts } from "../features/workouts/workoutSlice";
import { useParams } from "react-router-dom";
const ExerciseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sets: 0,
    reps: 0,
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
    <>
      <section>
        <h1>Create Exercise</h1>
      </section>
      <section className="form">
        <form onSubmit={submitExercise}>
          <div className="form-group">
            <label htmlFor="name">Exercise Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              name="name"
              placeholder="Exercise name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Exercise Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              name="description"
              placeholder="Exercise description"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sets">Number of Sets</label>
            <input
              type="number"
              className="form-control"
              id="sets"
              min={0}
              max={100}
              value={sets}
              name="sets"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reps">Number of Reps</label>
            <input
              type="number"
              min={0}
              max={100}
              className="form-control"
              id="reps"
              value={reps}
              name="reps"
              //   placeholder="Exercise name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add exercise
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default ExerciseForm;
