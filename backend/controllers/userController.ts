import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import { User } from "../models/userModel";

export const getUser = asyncHandler((req: express.Request, res: express.Response) =>{

})
export const addUser = (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "add user" });
};

export const loginUser = (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "login user" });
};
