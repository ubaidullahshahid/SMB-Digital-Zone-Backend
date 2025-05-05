import { Router } from "express";
import authRoutes from "./authRoutes";
import currentUserRoute from "./currentUserRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/me", currentUserRoute);

export default router;
