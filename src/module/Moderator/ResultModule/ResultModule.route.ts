import { Router } from "express";
import { resultController } from "./ResultModule.controller";
import { auth } from "../../../Middleware/auth";


const router = Router();


router.post("/", auth(), resultController.postWeeklyResult);

router.put("/:id", auth(), resultController.updateResult);


router.delete("/:id", auth(), resultController.deleteResult);

export const resultRoutes = router;