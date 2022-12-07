import { Exercise } from "../models/exerciseModel";
import asyncHandler from "express-async-handler";
import { Workout } from "../models/workoutModel";
import express from "express";

/**
 * @desc set/add exercise to workout
 * @route POST /api/workouts/:workoutId/exercises/
 * @access private
 */

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

/**
 * @desc update exercise
 * @route PUT /api/workouts/:workoutId/exercises/:exerciseIdx
 * @access private
 */
export const updateExercise = asyncHandler(async (req: any, res: any) => {
  const workout = await Workout.findById(req.params.workoutId);
  const exercise = workout?.exercises[req.params.exerciseIdx];
  if (!exercise) {
    res.status(400);
    throw new Error("Exercise not found.");
  }
  const updatedExercise = {
    name: req.body.name,
    sets: req.body.sets,
    reps: req.body.reps,
    _id: exercise._id,
    user: exercise.user,
    __v: exercise.__v,
  };
  workout.exercises[req.params.exerciseIdx] = updatedExercise;
  await workout.save();
  res.status(200).json(updatedExercise);
});

/**
 * @desc delete exercise from workout
 * @route DELETE /api/workouts/:workoutId/exercises/:exerciseIdx
 * @access private
 */
export const deleteExercise = asyncHandler(async (req: any, res: any) => {
  const workout = await Workout.findById(req.params.workoutId);
  const exercise = workout?.exercises[req.params.exerciseIdx];
  if (!exercise) {
    res.status(400);
    throw new Error("Exercise not found.");
  }
  if (!workout) {
    res.status(400);
    throw new Error("Workout not found.");
  }
  workout.exercises.splice(parseInt(req.params.exerciseIdx), 1);
  await workout.save();
  res.json(workout);
});
