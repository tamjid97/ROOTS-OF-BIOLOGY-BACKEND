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

// PUT এর বদলে PATCH এবং সঠিক পাথ দেওয়া হলো
router.patch(
  "/update-profile",
  auth(Role.ADMIN, Role.MODERATOR, Role.STUDENT, Role.USER),
  userController.updateMyProfile
);

router.post(
  '/request-moderator',
  auth(), 
  userController.requestModerator
);

router.post(
  '/request-student',
  auth(), 
  userController.requestStudent
);

export const userRoutes: Router = router;