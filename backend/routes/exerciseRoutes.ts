import express from "express";
const router = express.Router();
import * as exerciseController from "../controllers/exerciseController";

router.get("/", exerciseController.getExercises);
router.post("/", exerciseController.addExercise);

export default router;
