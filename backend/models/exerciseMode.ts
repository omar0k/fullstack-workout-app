import mongoose, { mongo } from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    require: true,
  },
  weight: Number,
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
