import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { Exercise } from "../features/types";
import { deleteExercise } from "../features/workouts/workoutSlice";

const ExerciseComponent = ({ exercise }: { exercise: Exercise }) => {
  const dispatch: AppDispatch = useDispatch();
  const { workoutId } = useParams<{ workoutId: string }>();

  const deleteExer = (exerciseId: string) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(deleteExercise({ workoutId, exerciseId }));
    };
  };
  
  return (
    <>
      <button onClick={deleteExer(exercise._id)}>X</button>
      <h3>{exercise.name}</h3>
      <p>{exercise.description}</p>
      <p>Sets: {exercise.sets}</p>
      <p>Reps: {exercise.reps}</p>
    </>
  );
};

export default ExerciseComponent;
