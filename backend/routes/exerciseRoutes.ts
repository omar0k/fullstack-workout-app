import express from "express";
const router = express.Router();
import * as exerciseController from "../controllers/exerciseController";
import { protect } from "../middleware/authMiddleware";
// router.get("/", protect, exerciseController.getExercises);
router.delete(
  "/:workoutId/exercises/:exerciseId",
  protect,
  exerciseController.deleteExercise
);
router.put(
  "/:workoutId/exercises/:exerciseId",
  protect,
  exerciseController.updateExercise
);
router.post("/:workoutId/exercises", protect, exerciseController.addExercise);

export default router;
