import asyncHandler from "express-async-handler";
import { Workout } from "../models/workoutModel";
import express from "express";

/**
 *@desc Getting workouts of user
 *@route GET /api/workouts
 *@access PRIVATE
 */
export const getWorkouts = asyncHandler(
  async (req: any, res: express.Response) => {
    const workouts = await Workout.find({ user: req.user.id });
    res.status(200).json(workouts);
  }
);
export const getWorkout = asyncHandler(async (req: any, res: any) => {
  const workout = await Workout.findById(req.params.workoutId);
  if (!workout) {
    res.status(400);
    throw new Error("Workout not found.");
  }
  res.status(200).json(workout);
});

/**
 * @desc Set/Create a workout
 * @route POST /api/workouts/
 * @access private
 */
export const addWorkout = asyncHandler(async (req: any, res: any) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Add workout title");
  }
  const workout = await Workout.create({
    user: req.user.id,
    title: req.body.title,
    description: req.body.descrption,
  });
  res.status(200).json(workout);
});

/** 
 * @desc Deleting a workout
  @route DELETE /api/workouts/:workoutId
   @access Private
 */
export const deleteWorkout = asyncHandler(async (req: any, res: any) => {
  const workout = await Workout.findById(req.params.workoutId);
  if (!workout) {
    res.status(400);
    throw new Error("Workout not found.");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found ");
  }
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized. ");
  }
  await workout.remove();

  res.status(200).json({ id: req.params.workoutId });
});

/**  
@desc updating a workout
@route PUT /api/workouts/:workoutId
@access Private
*/
export const updateWorkout = asyncHandler(async (req: any, res: any) => {
  const workout = await Workout.findById(req.params.workoutId);
  if (!workout) {
    res.status(400);
    throw new Error("Workout not found. ");
  }
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }
  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.workoutId,
    { title: req.body.title, description: req.body.description },
    {
      new: true,
    }
  );
  res.status(200).json(updatedWorkout);
});
