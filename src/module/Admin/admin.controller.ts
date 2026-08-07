import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendRespons";
import httpStatus from "http-status";

const getAllUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const result = await adminService.getAllUserIntoDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get all users successfully",
      data: result, // সরাসরি অ্যারে বা ডেটা পাস করা হলো যেন ফ্রন্টএন্ডে ঝামেলা না হয়
    });
});

const approveUserToStudent = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const { id } = req.params;
  
  const result = await adminService.approveUserToStudentIntoDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User approved and changed to Student successfully",
    data: result,
  });
});

const banUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const { id } = req.params;

  const result = await adminService.banUserIntoDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User banned successfully", 
    data: result,
  });
});

const makeModerator = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
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
  approveUserToStudent,
  banUser,
  makeModerator
};