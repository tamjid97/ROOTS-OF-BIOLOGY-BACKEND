import { Router } from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../Middleware/auth";
import { Role } from "../../../generated/prisma/enums";




const router = Router();



router.post("/register", AuthController.createRegisterUser)
router.post("/login", AuthController.loginUser)
router.get(
  "/me",
  auth(Role.ADMIN, Role.MODERATOR, Role.STUDENT, Role.USER), 
  AuthController.getMyProfile
);

router.put(
  "/me",
  auth(Role.ADMIN, Role.MODERATOR, Role.STUDENT, Role.USER),
  AuthController.updateMyProfile
);

router.post(
  '/request-moderator',
  auth(), 
 AuthController.requestModerator
);
export const authRoutes = router;