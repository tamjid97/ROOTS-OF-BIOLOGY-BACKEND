import { Router } from "express";
import { auth } from "../../../Middleware/auth";
import { PictureController } from "./PictureEditsModule.controller";

const router = Router();


router.get("/", PictureController.getAllPictures);

router.post("/", auth("MODERATOR"), PictureController.createPicture);


router.put("/:id", auth("MODERATOR"), PictureController.updatePicture);


router.delete("/:id", auth("MODERATOR"), PictureController.deletePicture);

export const PictureRoutes = router;