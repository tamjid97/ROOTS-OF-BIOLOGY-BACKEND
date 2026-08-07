import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendRespons";
import httpStatus from "http-status";

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUserIntoDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get all users successfully",
      data: result,
    });
});

const getModeratorRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getModeratorRequestsIntoDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Moderator requests fetched successfully",
      data: result,
    });
});

const approveUserToStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  const result = await adminService.approveUserToStudentIntoDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User approved and changed to Student successfully",
    data: result,
  });
});

const updateRequestStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const result = await adminService.updateRequestStatusIntoDB(id as string, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Status updated successfully",
    data: result,
  });
});

const banUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const result = await adminService.banUserIntoDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User banned successfully", 
    data: result,
  });
});

const makeModerator = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  const result = await adminService.makeModeratorIntoDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User changed to MODERATOR successfully",
    data: result,
  });
});

export const adminController = {
  getAllUser,
  getModeratorRequests,
  approveUserToStudent,
  updateRequestStatus,
  banUser,
  makeModerator
};