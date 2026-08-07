import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { resultService } from "./ResultModule.service";
import { sendResponse } from "../../../utils/sendRespons";

const postNewResult = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; 
  const result = await resultService.postNewResultIntoDB(user.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Result posted successfully",
    data: result,
  });
});

const getAllResults = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await resultService.getAllResultsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All results fetched successfully",
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
  postNewResult,
  getAllResults,
  updateResult,
  deleteResult,
};