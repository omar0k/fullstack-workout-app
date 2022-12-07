import { protect } from "../middleware/authMiddleware";
import express from "express";
const router = express.Router();
import * as workoutController from "../controllers/workoutController";
router.get("/", protect, workoutController.getWorkouts);
router.get("/:workoutId", protect, workoutController.getWorkout);

router.post("/", protect, workoutController.addWorkout);
router.put("/:workoutId", protect, workoutController.updateWorkout);
router.delete("/:workoutId", protect, workoutController.deleteWorkout);

export default router;
