import express from "express";
import jwt from "jsonwebtoken";
import asynchHandler from "express-async-handler";

import { User } from "../models/userModel";

interface JwtPayload {
  id: string;
}
export const protect = asynchHandler(
  async (req: any, res: any, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;
     
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("not authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
