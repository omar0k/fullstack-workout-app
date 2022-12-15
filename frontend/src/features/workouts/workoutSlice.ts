import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { AnyAction } from "@reduxjs/toolkit";
import workoutService from "./workoutService";

// get workouts from localstorage
type MyState = {
  workouts: any[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};
const initialState: MyState = {
  workouts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} as MyState;
export const createWorkout: any = createAsyncThunk<
  string,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("workouts/create", async (workoutData, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.user.token;
    return await workoutService.createWorkout(workoutData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// Get user workouts
export const getWorkouts: any = createAsyncThunk<
  any,
  [],
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("workouts/getAllWorkouts", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await workoutService.getWorkouts(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// Delete workout

export const deleteWorkout: any = createAsyncThunk<
  object,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("workouts/delete", async (workoutId, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.user.token;
    return await workoutService.deleteWorkout(workoutId, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts.push(action.payload);
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkouts.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = action.payload;
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, action: AnyAction) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = state.workouts.filter((workout) => {
          workout._id !== action.payload.id;
        });
      });
  },
});

export const { reset } = workoutSlice.actions;
export default workoutSlice.reducer;
