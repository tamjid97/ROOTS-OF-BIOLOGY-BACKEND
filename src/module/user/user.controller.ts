import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import httpStatus from "http-status";
import { userServices } from "./user.service";

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string; 
    const profile = await userServices.getMYProfileFromDB(userId); 
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: profile,
    });
  }
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string; 
    const payload = req.body;
    const updatedUser = await userServices.updateProfileIntoDB(userId, payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  }
);

const requestModerator = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string; 

    const result = await userServices.requestModeratorIntoDB(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Moderator request submitted successfully",
      data: result,
    });
  }
);

// নতুন যুক্ত করা হলো Student রিকোয়েস্টের জন্য
const requestStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string; 

    const result = await userServices.requestStudentIntoDB(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Student request submitted successfully",
      data: result,
    });
  }
);

export const userController = {
  getMyProfile,
  requestModerator,
  requestStudent, // Export করা হলো
  updateMyProfile
}