import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../Middleware/auth";
import { Role } from "../../../generated/prisma/enums";




const router = Router();



router.post("/register", AuthController.createRegisterUser)
router.post("/login", AuthController.loginUser)

export const authRoutes = router;