import { Router } from "express";
import { registerUser } from "../controllers/auth/registerUser";
import { loginUser } from "../controllers/auth/loginUser";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
