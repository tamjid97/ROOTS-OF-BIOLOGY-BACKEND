import { Router } from "express";
import { moderatorController } from "./moderator.controller";

const router = Router();

// পেন্ডিং স্টুডেন্ট রিকোয়েস্ট লিস্ট পাওয়ার জন্য (GET)
router.get("/pending-requests", moderatorController.getPendingStudents);

// নির্দিষ্ট আইডি দিয়ে স্টুডেন্টের ডিটেইলস পাওয়ার জন্য (GET)
router.get("/details/:id", moderatorController.getStudentDetails);

// স্টুডেন্ট অ্যাপ্রুভ বা রিজেক্ট করার জন্য (PATCH)
router.patch("/approve/:id", moderatorController.updateStudentStatus);

export const moderatorRoutes = router;