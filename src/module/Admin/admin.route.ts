import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/", adminController.getAllUser);
router.get("/requests", adminController.getModeratorRequests);

router.patch("/approve/:id", adminController.approveUserToStudent);
router.patch("/request-status/:id", adminController.updateRequestStatus);
router.patch("/ban/:id", adminController.banUser);
router.patch("/role/:id", adminController.makeModerator);

export const adminRoutes: Router = router;