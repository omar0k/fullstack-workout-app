import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import colors from "colors";
import exerciseRouter from "./routes/exerciseRoutes";
import userRouter from "./routes/userRoutes";
import workoutRouter from "./routes/workoutRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
// Connect to MongoDB
connectDB();
app.get("/", (req, res) => {
  res.json("Hello, world");
});
// Exercises routes
app.use("/api/workouts/", exerciseRouter);
// Users
app.use("/api/users/", userRouter);
//Workouts routes
app.use("/api/workouts/", workoutRouter);
app.use(errorHandler);
app.listen(PORT, () =>
  console.log(colors.magenta(`Server started on port ${PORT}`))
);
