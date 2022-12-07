import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
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
