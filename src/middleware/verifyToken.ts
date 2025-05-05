import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";

const SECRET = process.env.JWT_SECRET;

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  jwt.verify(token, SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: err?.message || "Unauthorized" });
      return;
    }

    req.user = decoded as IUser;
    next();
  });
};

export default verifyToken;
