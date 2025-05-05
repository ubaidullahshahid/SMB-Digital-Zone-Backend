import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../models/userModel";
import { loginValidation } from "../../validators/authValidator";
import { comparePassword } from "../../utils/hash";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      user: { ...user.toJSON(), token },
      message: "Login successfully",
      success: true,
    });
  } catch (err) {
    const error = err as Error;
    console.error("Error during login:", error.message || error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
