import { Router } from "express";
import { resultController } from "./ResultModule.controller";
import { auth } from "../../../Middleware/auth";

const router = Router();

// Post Result
router.post("/", auth(), resultController.postNewResult);

// Get All Results (সব রেজাল্ট পাওয়ার মূল রুট)
router.get("/", resultController.getAllResults);

// Update Result
router.put("/:id", auth(), resultController.updateResult);

// Delete Result
router.delete("/:id", auth(), resultController.deleteResult);

export const resultRoutes: Router = router;