import { Router } from "express";
import { auth } from "../../../Middleware/auth";
import { PictureController } from "./PictureEditsModule.controller";

const router = Router();


router.get("/", PictureController.getAllPictures);

router.post("/", auth(), PictureController.createPicture);


router.put("/:id", auth(), PictureController.updatePicture);


router.delete("/:id", auth(), PictureController.deletePicture);

export const PictureRoutes = router;