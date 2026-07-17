import { Router } from "express";
import { auth } from "../../../Middleware/auth";
import { reviewController } from "./ReviewModul.controller";


const router = Router();


router.patch(
  "/approve/:id", 
  auth(), 
  reviewController.approveReview
);

export const reviewRoutes = router;