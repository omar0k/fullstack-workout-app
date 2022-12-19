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
  const exerciseId = req.params.exerciseId;
  if (!workout) {
    res.status(400);
    throw new Error("Workout not found");
  }
  const exericseIndex = workout?.exercises.findIndex(
    (exercise) => exercise._id == exerciseId
  );
  if (exericseIndex === -1) {
    res.status(400);
    throw new Error("Exercise not found.");
  }
  const exercise = workout?.exercises[exericseIndex];
  const updatedExercise = {
    name: req.body.name,
    sets: req.body.sets,
    reps: req.body.reps,
    _id: exercise._id,
    user: exercise.user,
    __v: exercise.__v,
  };
  workout.exercises[exericseIndex] = updatedExercise;
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
  if (!workout) {
    res.status(400);
    throw new Error("Workout not found.");
  }
  const exerciseId = req.params.exerciseId;
  const exerciseIndex = workout.exercises.findIndex(
    (exercise: any) => exercise._id.toString() === exerciseId
  );
  if (exerciseIndex === -1) {
    res.status(400);
    throw new Error("Exercise not found.");
  }
  workout.exercises.splice(exerciseIndex, 1);
  await workout.save();
  res.json(workout);
});
