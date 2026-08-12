import { NextFunction, Request, Response } from "express";
import { moderatorService } from "./moderator.service";
import httpStatus from "http-status";
import { sendResponse } from "../../../utils/sendRespons";
import { catchAsync } from "../../../utils/catchAsync";

const updateStudentStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body; 
  
  const result = await moderatorService.updateStudentRequestStatusIntoDB(id as string, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Student request ${status.toLowerCase()} successfully`,
    data: result,
  });
});

const getPendingStudents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await moderatorService.getPendingStudentRequestsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pending student requests fetched successfully",
    data: result,
  });
});

// নতুন: শুধুমাত্র আইডি দিয়ে সিঙ্গেল স্টুডেন্টের ডিটেইলস আনার কন্ট্রোলার
const getStudentDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await moderatorService.getStudentDetailsByIdFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student details fetched successfully",
    data: result,
  });
});

export const moderatorController = {
  updateStudentStatus,
  getPendingStudents,
  getStudentDetails,
};