import { Router } from "express";
import { pdfController } from "./pdfModuls.controller";
import { auth } from "../../../Middleware/auth";

const route = Router();

// Get All PDFs (সবার দেখার জন্য উন্মুক্ত রাখা হয়েছে, প্রয়োজন হলে auth() দিতে পারেন)
route.get("/", pdfController.getAllPdf);

route.post("/", auth(), pdfController.postNewPdf);

route.put("/:id", auth(), pdfController.updatePdf);

route.delete("/:id", auth(), pdfController.deletePdf);

export const pdfRouter: Router = route;