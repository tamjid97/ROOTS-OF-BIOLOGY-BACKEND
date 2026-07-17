import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { reviewService } from "./ReviewModul.service";
import { sendResponse } from "../../../utils/sendRespons";


const approveReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  

  const result = await reviewService.approveReviewIntoDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review approved successfully",
    data: result,
  });
});

export const reviewController = {

  approveReview,
};