import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware";
import * as userController from "../controllers/userController";
router.get("/me", protect, userController.getUser);
router.post("/", userController.addUser);
router.post("/login", userController.loginUser);
export default router;
