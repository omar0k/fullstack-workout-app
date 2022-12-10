import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createWorkout } from "../features/workouts/workoutSlice";
const WorkoutForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createWorkout({ title }));
    setTitle("");
  };

  const [title, setTitle] = useState("");
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group" id="title">
          <label htmlFor="title">Workout Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Create Workout
          </button>
        </div>
      </form>
    </section>
  );
};
export default WorkoutForm;
