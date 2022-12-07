import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import mongoose from "mongoose";

//Register/create user
//Route: POST /api/users/
export const addUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists. ");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

/**
*@desc authenticate user
@route post api/users/login
@acces public
*/
export const loginUser = asyncHandler(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials.");
    }
  }
);
const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "5d",
  });
};
export const getUser = asyncHandler(async (req: any, res: any) => {
  // @ts-ignore
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  });
});
