import { User } from "./../models/userModel";
import { Exercise } from "../models/exerciseModel";
import asyncHandler from "express-async-handler";
import { Workout } from "../models/workoutModel";
import express from "express";

// export const getExercises = asyncHandler(
//   async (req: any, res: express.Response) => {
//     const workout = await Workout.findById(req.params.id);
//     res.status(200).json(workout?.exercises);
//   }
// );
export const addExercise = asyncHandler(
  async (req: any, res: express.Response) => {
    if (!req.body.name || !req.body.sets || !req.body.reps) {
      res.status(400);
      throw new Error("Please add all fields.");
    }
    const workout = await Workout.findById(req.params.workoutId);
    if (!workout) {
      res.status(400);
      throw new Error("Workout not found");
    }
    const exercise = await Exercise.create({
      name: req.body.name,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
      user: req.user.id,
    });
    // Workout.find({ _id: exercise._id })
    //   .populate("exercises")
    //   .exec((err, result) => {
    //     if (err) {
    //       return res.json({ error: err });
    //     }
    //     res.json({ result: result });
    //   });
    workout.exercises.push(exercise);
    await workout.save();
    res.status(200).json(workout.exercises);
  }
);
export const updateExercsise = asyncHandler(async (req: any, res: any) => {
  const exercise = await Exercise.findById(req.params.exerciseId);
  if (!exercise) {
    res.status(400);
    throw new Error("Exercise not found.");
  }

  res.status(200).json(exercise);
});

export const deleteExercise = asyncHandler(async (req: any, res: any) => {
  const workout = await Workout.findById(req.params.workoutId);
  const exercise = workout?.exercises[req.params.exerciseIdx];
  if (!exercise) {
    res.status(400);
    throw new Error("Exercise not found.");
  }
  // await exercise.remove();
  res.json(exercise);
});
