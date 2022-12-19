export interface RootState {
  auth: AuthState;
  workouts: WorkoutsState;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  message: string | null;
}

export interface WorkoutsState {
  workouts: WorkoutType[];
  isLoading: boolean;
  isError: boolean;
  message: string | null;
  currentWorkout: WorkoutType | null;
}
export interface User {
  id: string;
  username: string;
  email: string;
}

export interface WorkoutType {
  _id: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  __v: string;
  title: string;
  description: string | null;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  reps: number;
  sets: number;
  _id: string;
  description: string | null;
}
export interface CreateExercisePayload {
  exercise: Exercise;
}
export interface CreateExerciseMeta {
  message: string;
}
export interface CreateExerciseInput {
  workoutId: string;
  exerciseData: Exercise;
  token: string;
}
