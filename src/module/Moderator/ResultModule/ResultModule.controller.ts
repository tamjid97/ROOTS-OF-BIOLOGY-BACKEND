import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { resultService } from "./ResultModule.service";
import { sendResponse } from "../../../utils/sendRespons";


const postWeeklyResult = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; 
  const result = await resultService.postWeeklyResultIntoDB(user.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Weekly result posted successfully",
    data: result,
  });
});


const updateResult = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  const result = await resultService.updateResultIntoDB(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Result updated successfully",
    data: result,
  });
});


const deleteResult = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  const result = await resultService.deleteResultIntoDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Result deleted successfully",
    data: result,
  });
});

export const resultController = {
  postWeeklyResult,
  updateResult,
  deleteResult,
};