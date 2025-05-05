import { Request, Response } from "express";
import UserModel from "../../models/userModel";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers["authorization"];
    const userDetail = req?.user;

    console.log("userDetail", userDetail);

    if (!userDetail) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await UserModel.findById(userDetail?.id);
    console.log("user", user);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({
      message: "user fetched successfully",
      user: { ...user.toJSON(), token },
      success: true,
    });
  } catch (err) {
    const error = err as Error;
    console.error("Error during login:", error.message || error);
    res.status(500).json({
      message: "Internal server error",
      error: error?.message || error,
      success: false,
    });
  }
};
