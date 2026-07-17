import { Router } from "express";

import { auth } from "../../../Middleware/auth";
import { BatchTimeController } from "./BatchTimeModule.controller";

const router = Router();


router.get("/", BatchTimeController.getAllBatchTimes);

router.post("/", auth("MODERATOR"), BatchTimeController.createBatchTime);


router.put("/:id", auth("MODERATOR"), BatchTimeController.updateBatchTime);


router.delete("/:id", auth("MODERATOR"), BatchTimeController.deleteBatchTime);

export const BatchTimeRoutes = router;