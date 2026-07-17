import { Router } from "express";
import { pdfController } from "./pdfModuls.controller";
import { auth } from "../../../Middleware/auth";




const route = Router();

route.post("/", auth(), pdfController.postNewPdf)

route.put("/:id", auth(), pdfController.updatePdf)

route.delete("/:id", auth(),pdfController.deletePdf)


export const pdfRouter = route;