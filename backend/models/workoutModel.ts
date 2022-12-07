import mongoose, { mongo } from "mongoose";
import { Exercise } from "./exerciseModel";
const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      required: true,
      type: String,
    },
    exercises: {
      required: true,
      type: [],
      ref: "Exercise",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Workout = mongoose.model("Workout", workoutSchema);
