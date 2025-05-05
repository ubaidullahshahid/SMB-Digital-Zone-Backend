import { Request, Response } from "express";
import UserModel from "../../models/userModel";
import { registerValidation } from "../../validators/authValidator";
import { hashPassword } from "../../utils/hash";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: error.details[0].message, success: false });
      return;
    }

    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User already exists", success: false });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({ email, password: hashedPassword });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { ...savedUser.toJSON(), token },
      success: true,
    });
  } catch (err) {
    console.error("Error during registration:", (err as Error).message || err);
    res.status(500).json({
      message: "Internal server error",
      error: (err as Error).message,
    });
  }
};
