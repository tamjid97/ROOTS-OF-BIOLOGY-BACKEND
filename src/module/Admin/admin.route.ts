import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/", adminController.getAllUser);

router.patch("/approve/:id", adminController.approveUserToStudent);

router.patch("/ban/:id", adminController.banUser);

router.patch("/role/:id", adminController.makeModerator);

// 👇 এখানে স্পষ্টভাবে : Router টাইপ জুড়ে দে
export const adminRoutes: Router = router;