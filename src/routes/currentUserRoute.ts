import { Router } from "express";
import { getCurrentUser } from "../controllers/user/getCurrentUser";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, getCurrentUser);

export default router;
