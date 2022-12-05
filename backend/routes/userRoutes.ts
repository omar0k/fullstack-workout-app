import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController";
router.get("/", userController.getUser);
router.post("/", userController.addUser);
router.post("/login", userController.loginUser);
export default router;
