import { Router } from "express";

import { auth } from "../../../Middleware/auth";
import { BatchTimeController } from "./BatchTimeModule.controller";

const router = Router();


router.get("/", BatchTimeController.getAllBatchTimes);

router.post("/", auth(), BatchTimeController.createBatchTime);


router.put("/:id", auth(), BatchTimeController.updateBatchTime);


router.delete("/:id", auth(), BatchTimeController.deleteBatchTime);

export const BatchTimeRoutes = router;