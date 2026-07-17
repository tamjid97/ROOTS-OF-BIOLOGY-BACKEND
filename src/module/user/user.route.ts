import { Router } from "express";

import { auth } from "../../Middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { userController } from "./user.controller";




const router = Router();




router.get(
  "/me",
  auth(Role.ADMIN, Role.MODERATOR, Role.STUDENT, Role.USER), 
  userController.getMyProfile
);

router.put(
  "/me",
  auth(Role.ADMIN, Role.MODERATOR, Role.STUDENT, Role.USER),
  userController.updateMyProfile
);

router.post(
  '/request-moderator',
  auth(), 
  userController.requestModerator
);
export const userRoutes = router;