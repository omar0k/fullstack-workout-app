import asyncHandler from "express-async-handler";
import { Exercise } from "./../models/exerciseMode";
import express from "express";

export const getExercises = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  }
);
export const addExercise = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    if (!req.body.name || !req.body.sets || !req.body.reps) {
      res.status(400);
      throw new Error("Please add all fields.");
    }
    const exercise = await Exercise.create({
      name: req.body.name,
      sets: req.body.sets,
      reps: req.body.reps,
      weight: req.body.weight,
    });
    res.status(200).json(exercise);
  }
);
